// src/components/membership/MembershipTiers.js
import React from 'react';
import { Link } from 'react-router-dom';

// --- Tier Card Component ---
const TierCard = ({ tier }) => {
  return (
    <div className={`tier-card ${tier.isFranchise ? 'franchise-tier' : ''}`}>
      <h3>{tier.name}</h3>
      <p className="tier-price">{tier.price}</p>
      
      <div className="tier-section">
        <strong>Who it's for:</strong>
        <p>{tier.who}</p>
      </div>

      <div className="tier-section">
        <strong>What you receive:</strong>
        <ul>
          {tier.receives.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="tier-section">
        <strong>Expected ROI Example:</strong>
        <p>{tier.roi}</p>
      </div>

      <div className="tier-guarantee">
          <p><strong>Includes our "Guided Business Warranty"</strong> — We mentor you until your first profit cycle.</p>
      </div>
      
      <a href="#" className="btn btn-primary tier-btn">
        {tier.buttonText}
      </a>
    </div>
  );
};

// --- Main Membership Tiers Page ---
const MembershipTiers = () => {
  // Data pulled directly from the business plan 
  const tiers = [
    {
      name: 'Starter Package',
      price: '₱20,000 - ₱100,000 Investment',      
	who: 'Rural Farmers & Urban Families looking for a guided, low-barrier entry to poultry farming.',
      receives: [
          'Chicks, feeds, and a starter coop',
          'Crucial mentorship and farm visits ',
        'Access to the full LCEN network',
      ],
        roi: 'A ₱10,000 starter investment has a potential income of ~₱2,000 per month.',
      buttonText: 'Start Your Farm',
      isFranchise: false,
    },
    {
      name: 'Franchise Tier',
      price: '₱150,000+ Investment',
        who: 'OFW Returnees or investors with capital who want a stable, mentored business opportunity.',
      receives: [
          'Full branding rights under the Legal Chicks name',
          'Guaranteed supplier access for your hub',
          'Inclusion in joint marketing campaigns ',
          'Become a regional center or "LCEN Ambassador"',
      ],
        roi: 'Serves as an accelerated geographical market capture, allowing you to become a regional supplier.',
      buttonText: 'Become a Franchise Hub',
      isFranchise: true,
    },
    {
      name: 'Annual Membership Fee',
      price: '₱1,000 - ₱3,000 / Year',
      who: 'Existing members who want to maintain their benefits after their first year.',
      receives: [
          'Continuous access to discounted supplies (10-15% margin)',
          'Ongoing training & certification access ',
          'Shared benefits from collective marketing ',
      ],
        roi: 'Sustained profitability by ensuring your input costs are lower than local feed stores.',
      buttonText: 'Renew Your Membership',
      isFranchise: false,
    },
  ];

  return (
    <div className="container tiers-page">
      <header className="page-header">
        <h1>Membership & Franchise Tiers</h1>
        <p>Find your path to a sustainable poultry business. All tiers are built on transparency and partnership.</p>
        <Link to="/dashboard">&larr; Back to Dashboard</Link>
      </header>

      <div className="tiers-grid">
        <TierCard tier={tiers[0]} />
        <TierCard tier={tiers[1]} />
        <TierCard tier={tiers[2]} />
      </div>

      {/* Guided Warranty Prompt */}
      <div className="warranty-explainer">
          <h3>What is the "Guided Business Warranty?" </h3>
        <p>
          It's our core promise to you. We know starting a farm can be scary.   Our warranty means you get free consultations, farm visits, and active support from our team until you successfully achieve your first income cycle. We are your partners, not just your suppliers.   No member gets left behind.
        </p>
      </div>
    </div>
  );
};

export default MembershipTiers;