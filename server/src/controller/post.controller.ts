import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { ImageService } from '../services/ftp.service';
import { getPagination } from '../helpers/paginate';

const imageService = new ImageService();

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content, published } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      res.status(400).json({ message: 'Title and content are required' });
      return;
    }

    const postRepository = AppDataSource.getRepository(Post);
    const userRepository = AppDataSource.getRepository(User);

    const author = await userRepository.findOne({ where: { id: userId } });
    if (!author) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Handle image uploads if any
    let images: string[] = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      images = await imageService.saveImages(req.files);
    }

    const post = postRepository.create({
      title,
      content,
      published: published || false,
      author,
      images: images,
    });

    await postRepository.save(post);

    res.status(201).json({
      status: true,
      message: 'Post created successfully',
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
        createdAt: post.createdAt,
        images: post.images,
      },
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const postRepository = AppDataSource.getRepository(Post);

    // If user is not admin, only show published posts
    // const isAdmin = req.user && req.user.role === "admin";
    // const whereClause = isAdmin ? {} : { published: true };

    const whereClause = { published: true };

    const { page, perPage, skip, take } = getPagination(req.query);

    const [posts, total] = await postRepository.findAndCount({
      where: whereClause,
      relations: ['author'],
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    res.status(200).json({
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
        images: post.images || [],
        author: {
          id: post.author.id,
          username: post.author.username,
        },
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      })),
      pagination: {
        total,
        per_page: perPage,
        current_page: page,
        last_page: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({
      where: { id: Number(id) },
      relations: ['author'],
    });

    if (!post) {
      res.status(404).json({ status: false, message: 'Post not found' });
      return;
    }

    // Check if post is published or user is author/admin
    const isAdmin = req.user && req.user.role === 'admin';
    const isAuthor = req.user && post.author && req.user.id === post.author.id;

    if (!post.published && !isAdmin && !isAuthor) {
      res.status(403).json({ status: false, message: 'Access denied' });
      return;
    }

    res.status(200).json({
      status: true,
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
        images: post.images || [],
        author: {
          id: post.author.id,
          username: post.author.username,
        },
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, published, removeImages } = req.body;
    const userId = req.user.id;
    //

    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({
      where: { id: Number(id) },
      relations: ['author'],
    });

    if (!post) {
      res.status(404).json({ status: false, message: 'Post not found' });
      return;
    }

    // Check if user is the author
    if (post.author.id !== userId) {
      res.status(403).json({ message: 'Not authorized to update this post' });
      return;
    }

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const newImages = await imageService.saveImages(req.files);
      post.images = [...(post.images || []), ...newImages];
    }

    // Handle image removals if specified
    if (
      removeImages &&
      Array.isArray(removeImages) &&
      removeImages.length > 0
    ) {
      await imageService.removeImages(removeImages);
      post.images = (post.images || []).filter(
        (image) => !removeImages.includes(image)
      );
    }

    // Update post
    if (title) post.title = title;
    if (content) post.content = content;
    if (published !== undefined) post.published = published;

    await postRepository.save(post);

    res.status(200).json({
      status: true,
      message: 'Post updated successfully',
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        images: post.images || [],
        published: post.published,
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({
      where: { id: Number(id) },
      relations: ['author'],
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Check if user is the author
    if (post.author.id !== userId) {
      res.status(403).json({ message: 'Not authorized to delete this post' });
      return;
    }

    // Delete associated images
    if (post.images && post.images.length > 0) {
      await imageService.removeImages(post.images);
    }

    await postRepository.remove(post);

    res.status(200).json({
      status: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// New endpoint to manage post images
export const managePostImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { removeImages } = req.body;
    const userId = req.user.id;

    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({
      where: { id: Number(id) },
      relations: ['author'],
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Check if user is the author
    if (post.author.id !== userId) {
      res
        .status(403)
        .json({ message: "Not authorized to manage this post's images" });
      return;
    }

    // Handle new image uploads
    let newImages: string[] = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      newImages = await imageService.saveImages(req.files);
      post.images = [...(post.images || []), ...newImages];
    }

    // Handle image removals
    if (
      removeImages &&
      Array.isArray(removeImages) &&
      removeImages.length > 0
    ) {
      await imageService.removeImages(removeImages);
      post.images = (post.images || []).filter(
        (path) => !removeImages.includes(path)
      );
    }

    await postRepository.save(post);

    res.status(200).json({
      message: 'Post images updated successfully',
      post: {
        id: post.id,
        images: post.images || [],
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    console.error('Manage post images error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//
export const deletePostImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { removeImages } = req.body;
    const userId = req.user.id;

    const postRepository = AppDataSource.getRepository(Post);
    const post = await postRepository.findOne({
      where: { id: Number(id) },
      relations: ['author'],
    });

    if (!post) {
      res.status(404).json({ status: false, message: 'Post not found' });
      return;
    }

    if (post.author.id !== userId) {
      res
        .status(403)
        .json({ status: false, message: 'Not authorized to delete images' });
      return;
    }

    if (!Array.isArray(removeImages) || removeImages.length === 0) {
      res
        .status(400)
        .json({ status: false, message: 'No images specified for deletion' });
      return;
    }

    const currentImages = post.images || [];
    const validImages = removeImages.filter((img) =>
      currentImages.includes(img)
    );

    if (validImages.length === 0) {
      res
        .status(400)
        .json({ status: false, message: 'No valid images found for deletion' });
      return;
    }

    await imageService.removeImages(validImages);
    post.images = currentImages.filter((img) => !validImages.includes(img));

    await postRepository.save(post);

    res.status(200).json({
      status: true,
      message: 'Images deleted successfully',
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        images: post.images || [],
        published: post.published,
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    console.error('Delete post images error:', error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};
