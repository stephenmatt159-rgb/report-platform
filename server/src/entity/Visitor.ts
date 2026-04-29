import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'visitors' })
export class Visitor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 🔐 Privacy-safe IP (hashed)
  @Index()
  @Column({ type: 'varchar', length: 255 })
  ip: string;

  // 🌍 Location (nullable – IP lookup can fail)
  @Column({ type: 'varchar', nullable: true })
  continent?: string;

  @Column({ type: 'varchar', nullable: true })
  country?: string;

  @Column({ type: 'varchar', nullable: true })
  countryCode?: string;

  @Column({ type: 'varchar', nullable: true })
  region?: string;

  @Column({ type: 'varchar', nullable: true })
  district?: string;

  @Column({ type: 'varchar', nullable: true })
  city?: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitude?: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitude?: number;

  // 🧠 Device & UA
  @Column({ type: 'varchar', nullable: true })
  userAgent?: string;

  @Column({ type: 'varchar', nullable: true })
  browser?: string;

  @Column({ type: 'varchar', nullable: true })
  browserVersion?: string;

  @Column({ type: 'varchar', nullable: true })
  os?: string;

  @Column({ type: 'varchar', nullable: true })
  osVersion?: string;

  @Column({ type: 'varchar', nullable: true })
  deviceType?: string;

  @Column({ type: 'varchar', nullable: true })
  platform?: string;

  @Column({ type: 'varchar', nullable: true })
  vendor?: string;

  // 🌐 Locale & Network
  @Column({ type: 'varchar', nullable: true })
  language?: string;

  @Column({ type: 'simple-array', nullable: true })
  languages?: string[];

  @Column({ type: 'varchar', nullable: true })
  timezone?: string;

  @Column({ type: 'varchar', nullable: true })
  networkType?: string;

  // 🖥 Screen & hardware (JSON blobs)
  @Column({ type: 'json', nullable: true })
  screen?: {
    width: number;
    height: number;
    pixelRatio: number;
  };

  @Column({ type: 'json', nullable: true })
  hardware?: any;

  // 📄 Page info
  @Column({ type: 'json' })
  page: {
    path: string;
    url: string;
    referrer?: string;
  };

  // ⏱ Timestamps
  @Column({ type: 'varchar', nullable: true })
  clientTimestamp?: string;

  @CreateDateColumn()
  serverTimestamp: Date;
}
