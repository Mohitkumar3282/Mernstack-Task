export default function Navbar({ setSearch }) {
  return (
    <div className="navbar">
      <div className="logo">⭐ Review&Rate</div>
      <input
        className="search-box"
        placeholder="Search..."
        onChange={e => setSearch(e.target.value)}
      />
      <div>SignUp | Login</div>
    </div>
  );
}
