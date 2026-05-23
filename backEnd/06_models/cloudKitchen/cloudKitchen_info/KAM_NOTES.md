# Things to ask the KAMs

Personal reminder list. Add to it whenever a schema decision needs platform-side info.

---

## Reply mechanics (per platform)

- Where does my reply show up? (Public on shop page? Private email? Internal-only?)
- Do you, the KAM, see my replies?
- Is there an edit limit or time window for replying?
- Can replies have attachments?

## Cuisine tags

- Send me the full list of cuisine tags I can use on your platform.
- Any regional differences (UAE vs Saudi)?
- How often does the list change? Will you tell me when it does?

## Campaigns

- Do you charge any per-order participation fee for promotions? (Talabat charges 2 AED/order for the 50%-off promo — verify the others don't.)
- Can you send the **full details of every campaign** currently running for our brand on your platform? Include: name, kind (percentage / BOGO / free delivery / etc.), value, cap, min-order conditions, funding split (who pays), validity dates, and any per-order fees.
- When new campaigns launch, can you notify me in advance with the same details?

## Advertising options

- What ad types do you offer? (banner, CPC, CPM, featured listing, sponsored search, commission uplift, etc.)
- For each: what's the pricing model (fixed, per-click, percent-of-sales)?
- Do you provide reports with impressions / clicks / attributed orders? If yes, how do I access them?
- Are there minimum spends or contractual commitments?
- For CPC specifically (the one we currently run): what's the per-click rate? Daily caps? Reporting frequency?

## Pro users / subscriptions / extra per-order charges

Confirmed already:

- ✅ Talabat — +4 AED Pro Delivery Fee, exposed per-order in direct report
- ✅ Careem — C+ users charged differently, exposed as daily aggregate (business report CSV)
- ✅ Deliveroo — **no pro user charges**, irrelevant
- ✅ Keeta — **no pro users at all**, irrelevant

Still pending:

- Noon — what's the pro/subscription scheme and how is it reported? (TBD with accountant)

---

_(add more as they come up)_

<!--
grabTech Order columns

1st	Column)	Brand:                      Vkusno or Blini
2nd	Column)	Channel:                    Talabat, Careem, Deliveroo, Noon, Keeta, restHero, Pickup(in store, no aggregators. Only available in one branch(Arjan)
3rd	Column)	Location:                   Specifies the Branch
4th	Column)	Unique Order ID:            the id in GrabTech
5th	Column)	Order ID:                   Id in the aggregator's platform
6th	Column)	Sequence Number:            Don’t really know what is this used but I think it can be used along side with the "Unique Order ID" to attach the menu items to the orders.
7th	Column)	Received At:                When order was recived
8th	Column)	Type:                       We do not cae about this
9th	Column)	Customer Name:               we need to ignore these for now.
10th Column) Telephone:                 we need to ignore these for now.
11th Column) Address:                   we need to ignore these for now.
12th Column) VAT ID:                    We do not cae about this
13th Column) Currency:                  We do not cae about this
14th Column) Item Price:                total Items amount
15th Column) Surcharge:                 I'm not sure what is this used for
16th Column) Delivery:                  We do not cae about this
17th Column) Net Sales:                 this is the gross sales minus the discount and minus the VAT
18th Column) Gross Price:               Gross Sales
19th Column) Discount:                  Discount amount capped at 30 AED basket level.
20th Column) VAT:                       5% vat, but I am not sure that is it calculated after the discount applied of before? I think it is calculated on the net, after the discount applied. Please double check!
21st Column) Total(Receipt Total):      net plust the VAT.
22nd Column) Channel Service Charge:    We do not cae about this
23rd Column) Payment Method:            We do not cae about this
24th Column) Payment Type:              We do not cae about this
25th Column) Fort ID:                   We do not cae about this
26th Column) Discount Code:             this is also I think useless since not all the platforms provide to grabtech the exact valus. Since we already know that which are the active campaignt we will check on our won. I think. I am not sure.
27th Column) Delivery Partner Name:     Delivery Partner Name
28th Column) Delivery Plan:             We do not cae about this
29th Column) Note:                      We do not cae about this
30th Column) Customer Note:             Customer Note for Order instructions
31st Column) Employee Name:             We do not cae about this
32nd Column) Tips:                      We do not cae about this


 -->

<!--
Grabtech menu Items columns


1st	Column)	Menu Item:                  This is the menu Item's name
2nd	Column)	Menu Item External ID :     This has to be matched to the MenuItem.externalId
3rd	Column)	Modifier:                   I think this is the MenuItemModifierOption's name
4th	Column)	Modifier External ID:       I think this is the MenuItemModifierOption's externalId
5th	Column)	Brand:                      Vkusno or Blini
6th	Column)	Channel:                    Talabat, Careem, Deliveroo, Noon, Keeta, restHero, Pickup(in store, no aggregators. Only available in one branch(Arjan)
7th	Column)	Location:                   Specifies the Branch
8th	Column)	Order ID:                   Id in the aggregator's platform
9th	Column)	Unique Order ID:            the id in GrabTech, I think this used along side with the "Sequence Number" to attach the menu items to the orders.
10th Column) Sequence Number:           Don’t really know what is this used but I think it can be used along side with the "Unique Order ID" to attach the menu items to the orders.
11th Column) Date:                      it is the same as the "Received At" field from the orders and it is When order was recived.
12th Column) Qty:                       quantity of the menu item
13th Column) Currency:                  We do not cae about this
14th Column) Item Price:                This is the menu Item's (MenuItem.sellingPrice.gross) they have to absolutly match
15th Column) Item Total Sales Amount:   this is quantity of the menu item times the item price. I think. I am not sure
16th Column) Item Discount:             We do not cae about this
17th Column) Type:                      We do not cae about this
18th Column) Order Price:               this is the amount of the "Total(Receipt Total)" in the orders
19th Column) Delivery:                  We do not cae about this
20th Column) Net Sales:                 same like "Net Sales" in the orders
21st Column) Gross Price:               same like "Gross Price" in the orders
22nd Column) Discount:                  We do not cae about this
23rd Column) VAT:                       We do not cae about this
24th Column) Total(Receipt Total):      We do not cae about this
25th Column) Payment Method:            We do not cae about this
26th Column) Payment Type:              We do not cae about this
27th Column) Tags:                      this is the menu item's category name
 -->
