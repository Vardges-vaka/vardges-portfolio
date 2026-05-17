import "../../../_styles/competitors_table_row_reviews.css";
import {
  getCompetitorRatingReviewSummary,
} from "../../../02_competitors_helpers/_competitors_helpers.index.js";
import Competitors_table_row_openIconBtn from "./Competitors_table_row_openIconBtn.jsx";

const Competitors_table_row_reviews = ({ competitor, handlers, t }) => {
  const h = handlers?.handleCompetitorTableAction;
  const { avgRating, reviewCount } = getCompetitorRatingReviewSummary(competitor);

  const ratingLabel =
    avgRating != null && !Number.isNaN(avgRating)
      ? avgRating.toFixed(1)
      : "—";
  const reviewsLabel =
    reviewCount != null && reviewCount > 0
      ? reviewCount.toLocaleString()
      : "—";

  const detailTitle = t
    ? t("tableRow.detailReviews", { defaultValue: "Ratings and reviews" })
    : "Ratings and reviews";

  const summaryAria = t
    ? t("tableRow.reviewsSummaryAria", {
        rating: ratingLabel,
        reviews: reviewsLabel,
      })
    : `Average rating ${ratingLabel}, reviews ${reviewsLabel}. ${detailTitle}`;

  return (
    <div className="Competitors_table_row_reviews">
      <span className="Competitors_table_row_reviews_rating" aria-hidden="true">
        {ratingLabel}
      </span>
      <span className="Competitors_table_row_reviews_sep" aria-hidden="true">
        ·
      </span>
      <span className="Competitors_table_row_reviews_count" aria-hidden="true">
        {reviewsLabel}
      </span>
      <Competitors_table_row_openIconBtn
        onClick={h}
        dataSession="view_reviews"
        competitorId={competitor._id}
        title={detailTitle}
        ariaLabel={summaryAria}
      />
    </div>
  );
};

export default Competitors_table_row_reviews;
