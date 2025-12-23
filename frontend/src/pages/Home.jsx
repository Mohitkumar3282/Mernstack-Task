import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CompanyCard from "../components/CompanyCard";
import AddCompanyModal from "../components/AddCompanyModel";
import { API } from "../services/api";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("");
  const [showModal, setShowModal] = useState(false);

  const loadCompanies = async () => {
    const res = await API.get(
      `/company?search=${search}&city=${city}`
    );
    setCompanies(res.data);
  };

  useEffect(() => {
    loadCompanies();
  }, [search, city]);

  return (
    <>
      
      <Navbar setSearch={setSearch} />

      
      <div className="controls">
        <select
          className="select"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select City</option>
          <option value="Indore">Indore</option>
          <option value="Bhopal">Bhopal</option>
          <option value="Delhi">Delhi</option>
        </select>

        <button className="btn" onClick={loadCompanies}>
          Find Company
        </button>

        <button className="btn" onClick={() => setShowModal(true)}>
          + Add Company
        </button>

        <select
          className="select"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="name">Name</option>
        </select>
      </div>

      
      {companies.map((c) => (
        <CompanyCard key={c._id} company={c} />
      ))}

      
      {showModal && (
        <AddCompanyModal
          close={() => setShowModal(false)}
          refresh={loadCompanies}
        />
      )}
    </>
  );
}




