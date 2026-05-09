import mongoose from "mongoose";

import { coordinateSchema } from "../../../04_helpers/helpers.index.js";

// ─── Main schema ──────────────────────────────────────────────────────────────

/*
name
logo
description
cuisineTypes
socials
priceRange
contact
menu
observations
files
competesWithBrands
hasOwnDeliveryDubai
isActive



frontEnd

view_competitors_table session:

 view_competitors_table Header Row:

# | Name | Logo | cuisineTypes | priceRange | menu | menuItemsQnt | menuCategoriesQnt | ownDeliveryDubai | competesWithBrands |branches | Update | View





view_competitors_table  columns: 

1st: #
the index plus 1
2nd: Name
the name of the competitor Competitor.name, next to it small btn to view. when pressed the session changes to view_name. 
3rd: Logo
the logo of the competitor. Competitor.logo. next to it small btn to view. when pressed the session changes to view_logo. 
the logo should not be the raw string stored in my db but be the url from the cloud storage provider. 
so my backEnd has to grab the path from the Competitor schema and get the url from the cloud storage provider and send it to my front end. 

4th: cuisineTypes
the cuisine types of the competitor. Competitor.cuisineTypes.tag only show maximum of 3 tags. next to it small btn to view. when pressed the session changes to view_cuisineTypes. 

5th: priceRange
the price range of the competitor. Competitor.priceRange. next to it small btn to view. when pressed the session changes to view_priceRange. 


6th: menu
the menu of the competitor. Competitor.menu.name . next to it small btn to view. when pressed the session changes to view_menu. 
7th: competesWithBrands
the brands that the competitor competes with. Competitor.competesWithBrands.logo . 
so it should show maximum of 3 logos next to it small btn to view. when pressed the session changes to view_competesWithBrands. 

8th: branches
it show the count of the number of branches of the competitor. Competitor.branches.totalQnt. next to it small btn to view. when pressed the session changes to view_branches. 


9th: Update
the update button should be only Icon. when pressed it turns the session to view_competitor and switches the isEditing state to true. 

10th: View
the view button should be only Icon. when pressed it turns the session to view_competitor. and switches the isEditing state to false.




Sessions: we have 10 sessions and isEditing state! which is a boolean value that is true when the session is in edit mode and false when the session is in view mode.

1st: view_name
2nd: view_logo
3rd: view_cuisineTypes
4th: view_priceRange
5th: view_menu
6th: view_competesWithBrands
7th: view_branches
8th: view_competitor
9th: view_competitors_table
10th: view_competitors_map

here are the session explainations: 

1st: view_name
it shows the Competotor.name and competitor.description and a btn that lets you go back to the session. also a btn to edit/Update the name and description.

2nd: view_logo
it shows a btn that lets you go back to the session. it shows the Competotor.logo its size, the file format. the download btn View btn and Trash btn and update/edit btn. 
hen pressed the edit/Update btn it opens a file input(dropzone) to add or replace the logo.
in the file input it should show all infor regarding the uploading file like the name, size, file format. and the current logo if there is one. than confirms it and updates the logo in the db.
the download btn lets you download the file. 
the view btn lets you view the file in a new tab.
the trash btn lets you delete the file from the cloud storage provider.
the trash and update/edit btns should have a additional confiramtions through a modal.

3rd: view_cuisineTypes
here we have a list of cuisineTypes. 
we should show all the cuisineTypes that are in the Competitor.cuisineTypes.tag and next to them the description(Competitor.cuisineTypes.description).
than we have a btn to edit/update the cuisineTypes. when pressed it opens a plade where all it shows all the cuisineTypes that are available and the ones that are added. and ofcourse confirm and cancel btn. 
when pressed the confirm btn it updates the cuisineTypes in the db. when cancel than it restores as it was. also there will be a btn to go back to the previous session.

4th: view_priceRange
it shows the Competitor.priceRange. also a small btn to go back, when pressed the session changes to view_competitors_table. 
also a btn to edit/update the priceRange. when pressed it opens a select where the user selects the price range and confirms.
the select should show all the priceRanges that are available.
when pressed the confirm btn it updates the priceRange in the db. when cancel than it restores as it was. 

5th: view_menu
a small btn to go back, when pressed the session changes to view_competitors_table. 
it shows the Competitor.menu. sectioned by the Competitor.menu.categories. also there should be a way to update/edit the menus. 
when pressed the update/edit btn it should allow to select other menu from the list of menus that are available. and confirm it.





6th: view_competesWithBrands
a small btn to go back, when pressed the session changes to view_competitors_table. 
it shows the Competitor.competesWithBrands.logo , Competitor.competesWithBrands.name, Competitor.competesWithBrands.cuisineTypes and Competitor.competesWithBrands.description.
should be way to update/edit the competesWithBrands.
when pressed the update/edit btn it should allow to select other competitor from the list of competitors that are available. and confirm it.





7th: view_branches
a small btn to go back, when pressed the session changes to view_competitors_table. 

it shows totalQnt of the branches.
it shows in checkbox the multiBranch, multiEmirates, multiCountry parts. 

than it shows a map with all the branches of the competitor. and each branch is a pin on the map. 
When clicked on a pin it shows small tooltip that prompts the user to select one of the following options: 

1. view branch 
2. show coverage / hide coverage

when view branch  is selected it opens a section that shows all the details of the branch.

the branch details.

when show coverage / hide coverage is selected it shows a on the map the coverage of the branch.

there should be a way to add a new branch. and a way to edit/update the branch. as well. 


 





8th: view_competitor
a small btn to go back, when pressed the session changes to view_competitors_table. also a btn that lets you edit/update all the sections. 

this one shows all the Competitor sections that comes from my backEnd 




9th: view_competitors_table 
this is the defauly view when the app starts.

10th: view_competitors_map

this one shows all the competitors in the map with the pins, bit instead of the regular pins it should replace the pins with the logos of the competitors. 





*/

const competitorSchema = new mongoose.Schema(
  {
    name: { type: String },
    logo: { storage: { type: String }, path: { type: String } },
    description: { type: String },

    // ── Market positioning ────────────────────────────────────────────────────
    cuisineTypes: [{ tag: { type: String }, description: { type: String } }], // ["burgers", "shawarma", "pizza"]
    priceRange: {
      type: String,
      enum: ["budget", "mid", "premium"],
    },

    // ── Socials & contact ─────────────────────────────────────────────────────
    socials: {
      instagram: { type: String },
      facebook: { type: String },
      tikTok: { type: String },
      linkedIn: { type: String },
      youtube: { type: String },
      twitter: { type: String },
      website: { type: String },
      others: [{ link: { type: String }, label: { type: String } }],
    },
    contact: {
      email: { type: String },
      whatsApp: { type: String },
      telegram: { type: String },
      phone: { type: String },
    },

    /** First-party delivery in Dubai (vs aggregator-only). */
    hasOwnDeliveryDubai: { type: Boolean, default: false },

    // ── Branch footprint ──────────────────────────────────────────────────────
    branches: {
      totalQnt: { type: Number },
      multiBranch: { type: Boolean },
      multiEmirates: { type: Boolean },
      multiCountry: { type: Boolean },
      // new fields
      avgRatingPerPlatform: {
        talabat: { type: Number },
        careem: { type: Number },
        noon: { type: Number },
        deliveroo: { type: Number },
        keeta: { type: Number },
        google: { type: Number },
      },
      avgReviewCountPerPlatform: {
        talabat: { type: Number },
        careem: { type: Number },
        noon: { type: Number },
        deliveroo: { type: Number },
        keeta: { type: Number },
        google: { type: Number },
      },
      // ---------------------------------------

      locations: [
        {
          country: { type: String },
          hasDineIn: { type: Boolean },
          hasOwnDelivery: { type: Boolean },
          emirate: { type: String },
          state: { type: String },
          city: { type: String },
          address: { type: String },
          coordinates: coordinateSchema(),
          coverageAreas: {
            byDistance: {
              polygon: [coordinateSchema()],
              radius: {
                km: { type: Number },
                center: coordinateSchema(),
              },
            },
            byDriveTime: {
              polygon: [coordinateSchema()],
              radius: {
                minutes: { type: Number },
                center: coordinateSchema(),
              },
            },
          },
          links: [{ label: { type: String }, link: { type: String } }],
          // ── Delivery platform presence ─────────────────────────────────────────────
          // Ratings, fees, and menu can differ per platform — tracked independently.
          platforms: [
            {
              name: { type: String }, // "Talabat" | "Careem Now" | "Noon Food" | "Deliveroo" | "InstaShop"
              storeUrl: { type: String },
              isActive: { type: Boolean, default: true },
              rating: { type: Number },
              reviewCount: { type: Number },
              deliveryFee: { type: Number }, // AED
              minOrder: { type: Number }, // AED
              deliveryTimeMin: { type: Number }, // estimated minutes
              lastChecked: { type: Date },
              notes: { type: String },
            },
          ],
          // ── Active promotions / deals ─────────────────────────────────────────────
          promos: [
            {
              name: { type: String },
              platform: { type: String },
              discountType: {
                type: String,
                enum: ["fixed", "percentage", "freeDelivery", "bogo", "other"],
              },
              discountValue: { type: Number },
              discountCap: { type: Number },
              minOrder: { type: Number },
              startDate: { type: Date },
              endDate: { type: Date },
              isActive: { type: Boolean, default: true },
              description: { type: String },
              capturedAt: { type: Date }, // when this promo was first spotted
            },
          ],
        },
      ],
    },

    // ── Menu ──────────────────────────────────────────────────────────────────
    // Points to the latest/primary CompetitorMenu snapshot.
    // Historical snapshots are stored on CompetitorMenu with isArchived: true.
    menu: { type: mongoose.Schema.Types.ObjectId, ref: "CompetitorMenu" },

    // ── Intelligence log ──────────────────────────────────────────────────────
    // Observation diary — tracks what changed, when, and what it means over time.
    observations: [
      {
        date: { type: Date },
        note: { type: String },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        tags: [{ type: String }], // "pricing" | "menu-change" | "expansion" | "marketing"
      },
    ],

    // ── Files ─────────────────────────────────────────────────────────────────
    files: [
      {
        ref: { type: String },
        value: { type: String },
        fileType: { type: String },
        sizeInKb: { type: Number },
        uploadedAt: { type: Date },
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],

    // ── Org links ─────────────────────────────────────────────────────────────
    // Brands this competitor is tracked against.
    // Brand.competitors[] also holds this ref — keep both in sync.
    competesWithBrands: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Competitor" },
    ],

    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

const Competitor = mongoose.model("Competitor", competitorSchema);
export default Competitor;
