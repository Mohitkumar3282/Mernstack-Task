export default function StarRating({ value }) {
  
  const rating = Math.max(
    0,
    Math.min(5, Math.round(Number(value) || 0))
  );

  return (
    <div className="stars">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </div>
  );
}
