import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
  return <div>
    <h1>Home page for campaign list app</h1>
    <button>
        <Link to="/campaignlist">Go to campaignlist</Link>
    </button>

  </div>;
}
