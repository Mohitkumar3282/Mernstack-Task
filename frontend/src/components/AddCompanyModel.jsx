import { useState } from "react";
import { API } from "../services/api";

export default function AddCompanyModal({ close, refresh }) {
  const [data, setData] = useState({});

  const submit = async () => {
    await API.post("/company", data);
    refresh();
    close();
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>Add Company</h3>
        <input placeholder="Name" onChange={e=>setData({...data,name:e.target.value})}/>
        <input placeholder="City" onChange={e=>setData({...data,city:e.target.value})}/>
        <input placeholder="Location" onChange={e=>setData({...data,location:e.target.value})}/>
        <input placeholder="Founded On" onChange={e=>setData({...data,foundedOn:e.target.value})}/>
        <button className="btn" onClick={submit}>Save</button>
      </div>
    </div>
  );
}
