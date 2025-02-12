import React from "react";

const DataDeletion = () => {
  return (
    <div className="data-deletion-container">
      <h1>Data Deletion Instructions</h1>
      <p>
        We value your privacy and ensure that your personal data is handled
        securely. If you wish to delete your personal data, please follow the
        instructions below:
      </p>

      <h2>How to Delete Your Data</h2>
      <ol>
        <li>
          Click the <strong>Logout</strong> button in the{" "}
          <strong>Navbar</strong> or go to your <strong>Profile Page</strong>.
        </li>
        <li>
          Once you log out, all your session-based personal data will be deleted
          from our system.
        </li>
        <li>
          If you have any further concerns, you can contact our support team.
        </li>
      </ol>

      <h2>Need Help?</h2>
      <p>
        If you face any issues or require additional assistance, feel free to
        reach out to our support team.
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        className="back-button"
      >
        Go to Home
      </button>

      <style>{`
        .data-deletion-container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          text-align: center;
          background: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
         .data-deletion-container h1, .data-deletion-container h2 {
          color: #333;
        }
        .data-deletion-container ol {
          text-align: left;
          padding-left: 20px;
        }
        .data-deletion-container p{
         color: blue;
        }
        .data-deletion-container .back-button {
          margin-top: 20px;
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .data-deletion-container .back-button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default DataDeletion;
