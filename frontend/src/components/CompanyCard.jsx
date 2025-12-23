import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";

export default function CompanyCard({ company }) {
  const nav = useNavigate();

  return (
    <div className="card">
      <div className="logo-box">{company.name[0]}</div>

      <div className="card-content">
        <div className="company-name">{company.name}</div>

        <div className="address">
          {company.location}, {company.city}
        </div>

        
        <div style={{ fontSize: "13px", color: "gray" }}>
          Founded: {company.foundedOn || "N/A"}
        </div>

        <StarRating value={company.avgRating} />
        <small>{company.totalReviews} Reviews</small>
      </div>

      <button
        className="detail-btn"
        onClick={() => nav(`/company/${company._id}`)}
      >
        Detail Review
      </button>
    </div>
  );
}
