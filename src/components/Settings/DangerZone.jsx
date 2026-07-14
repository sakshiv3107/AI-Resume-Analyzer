import React, { useState } from "react";
import { LogOut, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import ConfirmationModal from "./ConfirmationModal";

function DangerZone() {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [deleting, setDeleting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);


  const handleLogout = async () => {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    setLoggingOut(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/");
  };

  const handleDelete = async () => {
    setDeleting(true);

    // We'll implement actual deletion later
    setTimeout(() => {
      setDeleting(false);
      setShowModal(false);

      alert(
        "Account deletion will be connected to Supabase Edge Functions in the next step."
      );
    }, 1000);
  };

  return (
    <div className="bg-white rounded-3xl border border-red-200 shadow-sm p-8">

      <h2 className="text-2xl font-bold text-red-600">
        Danger Zone
      </h2>

      <p className="text-gray-500 mt-2">
        These actions are irreversible. Please proceed carefully.
      </p>

      <div className="flex flex-col md:flex-row gap-5 mt-8">

        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex-1 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition"
        >
          <Trash2 size={20} />
          Delete Account
        </button>
        <ConfirmationModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          loading={deleting}
          title="Delete Account"
          message="Are you sure you want to delete your account? This action cannot be undone."
          confirmText="Delete Account"
          confirmColor="red"
        />

        <button
          onClick={() => setShowLogoutModal(true)}
          disabled={loggingOut}
          className="flex-1 flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-100 py-4 rounded-xl font-semibold transition disabled:opacity-50"
        >
          <LogOut size={20} />
          {loggingOut ? "Logging Out..." : "Logout"}
        </button>
        <ConfirmationModal
          open={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          loading={loggingOut}
          title="Logout"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          confirmColor="blue"
        />

      </div>

    </div>
  );
}

export default DangerZone;