import "reflect-metadata";

import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

const fields: string[] = [
  "Appliances",
  "Architectural styles",
  "Assessed values",
  "Building name",
  "Categories",
  "CBSA code",
  "CBSA name",
  "Census block",
  "Census block group",
  "Census tract",
  "Congressional district house",
  "City",
  "Civil division code",
  "Civil division name",
  "Country",
  "County",
  "County FIPS",
  "Current owner type",
  "Date added",
  "Date updated",
  "Deposits",
  "Descriptions",
  "Domains",
  "Estimated prices",
  "Exterior construction",
  "Exterior features",
  "Features",
  "Fees",
  "Floor plans",
  "Floor size value",
  "Floor size unit",
  "Geo location",
  "Geo quality",
  "HVAC types",
  "Instrument number",
  "Keys",
  "Languages spoken",
  "Latitude",
  "Leasing terms",
  "Legal description",
  "Legal range",
  "Listing name",
  "Longitude",
  "Lot size value",
  "Lot size unit",
  "Managed by",
  "MLS number",
  "Most recent broker agent",
  "Most recent broker company",
  "Most recent broker date seen",
  "Most recent broker emails",
  "Most recent broker phones",
  "Most recent price amount",
  "Most recent price currency",
  "Most recent price domain",
  "Most recent price date",
  "Most recent status",
  "Most recent status date",
  "Most recent status first date seen",
  "MSA code",
  "MSA name",
  "Neighborhoods",
  "Number of bathrooms",
  "Number of bedrooms",
  "Number of floors",
  "Number of parking spaces",
  "Number of people",
  "Number of rooms",
  "Number of units",
  "Owner occupied",
  "Parking",
  "Parking types",
  "Parcel numbers",
  "Payment types",
  "People",
  "Pet policy",
  "Phones",
  "Postal code",
  "Prices",
  "Property taxes",
  "Property type",
  "Province",
  "Reviews",
  "Roofing",
  "Room types",
  "Rules",
  "Statuses",
  "Subdivision",
  "Tax exemptions",
  "Tax ID",
  "Title",
  "Topography code",
  "Trust description",
  "Website IDs",
  "Year built",
  "Zoning",
];

@Entity("texas")
export class Property {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "varchar", nullable: true })
  address?: string;

  @Column({ type: "varchar" })
  city: string;

  @Column({ type: "varchar", nullable: true })
  country?: string;

  @Column({ type: "varchar", nullable: true })
  county?: string;

  @CreateDateColumn({ type: "varchar" })
  dateAdded: string;

  @UpdateDateColumn({ type: "datetime" })
  dateUpdated: string;

  @Column("float", { nullable: true })
  floorSizeValue?: number;

  @Column({ type: "varchar", nullable: true })
  floorSizeUnit?: string;

  @Column("simple-array", { nullable: true })
  imageURLs?: string[];

  @Column("json")
  keys: unknown[];

  @Column({ type: "varchar", nullable: true })
  latitude?: string;

  @Column({ type: "varchar", nullable: true })
  longitude?: string;

  @Column("float", { nullable: true })
  lotSizeValue?: number;

  @Column({ type: "varchar", nullable: true })
  lotSizeUnit?: string;

  @Column("float", { nullable: true })
  mostRecentPriceAmount?: number;

  @Column({ type: "varchar" })
  mostRecentStatus: string;

  @Column({ type: "varchar", nullable: true })
  mlsNumber?: string;

  @Column({ type: "varchar", nullable: true })
  msaName?: string;

  @Column("int", { nullable: true })
  msaCode?: number;

  @Column("json", { nullable: true })
  neighborhoods?: unknown[];

  @Column("float", { nullable: true })
  numBathroom?: number;

  @Column("int", { nullable: true })
  numBedroom?: number;

  @Column("int", { nullable: true })
  numFloor?: number;

  @Column("int", { nullable: true })
  numParkingSpaces?: number;

  @Column({ type: "varchar", nullable: true })
  postalCode?: string;

  @Column({ type: "varchar", nullable: true })
  propertyType?: string;

  @Column({ type: "varchar" })
  province: string;

  @Column({ type: "varchar", nullable: true })
  mostRecentBrokerAgent?: string;

  @Column({ type: "varchar", nullable: true })
  mostRecentBrokerCompany?: string;

  @Column("float", { nullable: true })
  mostRecentRentalPriceAmount?: number;

  @Column("int", { nullable: true })
  numUnit?: number;

  @Column("json", { nullable: true })
  people?: unknown[];

  @Column("json", { nullable: true })
  estimatedPrices?: unknown[];

  @Column("int", { nullable: true })
  numRoom?: number;

  @Column("json", { nullable: true })
  companies?: unknown[];

  @Column("int", { nullable: true })
  numPeople?: number;
}
