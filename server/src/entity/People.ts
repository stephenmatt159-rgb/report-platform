import 'reflect-metadata';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('people')
export class People {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  jobTitle: string;

  @Column({ type: 'varchar' })
  businessName: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  province: string;

  @Column({ type: 'varchar' })
  postalCode: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column('simple-array')
  businessCategories: string[];

  @Column('simple-array')
  emails: string[];

  @Column('simple-array')
  professionalEmails: string[];

  @Column({ type: 'varchar' })
  primaryEmail: string;

  @Column({ type: 'json', nullable: true })
  phoneNumbers: { number: string }[];

  @Column('simple-array')
  keys: string[];

  @Column({ type: 'varchar' })
  linkedinURL: string;

  @Column('simple-array')
  sourceURLs: string[];
}
