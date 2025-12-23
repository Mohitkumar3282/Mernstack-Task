import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../services/api";

export default function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [sort, setSort] = useState("latest");

  const [form, setForm] = useState({
    name: "",
    subject: "",
    review: "",
    rating: 1,
  });

  
  const loadReviews = useCallback(async () => {
    const res = await API.get(`/review/${id}?sort=${sort}`);
    setData(res.data);
  }, [id, sort]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

 
  const submitReview = async () => {
    await API.post("/review", {
      companyId: id,
      ...form,
    });

    setForm({
      name: "",
      subject: "",
      review: "",
      rating: 1,
    });
loadReviews();
    
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      
      <div style={{ marginBottom: "20px" }}>
        <h2>Company Reviews</h2>
        <h3>⭐ Average Rating: {data.averageRating}</h3>
        <p>Total Reviews: {data.totalReviews}</p>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Latest Reviews</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      <hr />

      
      {data.reviews.map((r) => (
        <div
          key={r._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "12px",
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          <h4>{r.subject}</h4>
          <p>{r.review}</p>
          <small>By {r.name}</small>
          <div>⭐ {r.rating}</div>

          
          <div style={{ marginTop: "8px" }}>
            <button
              onClick={async () => {
                await API.patch(`/review/like/${r._id}`);
                loadReviews();
              }}
            >
              👍 Like ({r.likes || 0})
            </button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Review link copied!");
              }}
            >
              🔗 Share
            </button>
          </div>
        </div>
      ))}

      <hr />

     
      <h3>Add Review</h3>

      <input
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />

      <textarea
        placeholder="Write your review"
        value={form.review}
        onChange={(e) => setForm({ ...form, review: e.target.value })}
      />

      <input
        type="number"
        min="1"
        max="5"
        value={form.rating}
        onChange={(e) =>
          setForm({ ...form, rating: Number(e.target.value) })
        }
      />

      <br />
      <button onClick={submitReview}>Submit Review</button>

      <br />
      <br />

      <button onClick={() => navigate("/")}>⬅ Back to Home</button>
    </div>
  );
}
