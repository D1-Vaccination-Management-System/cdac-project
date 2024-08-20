import { deletePatientProfile } from "../service/patient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteProfile = ({setSelectedComponent}) => {
  
    const patientId = sessionStorage.getItem('patientId'); // Fetch patient ID from session storage
  
    const handleDelete = async () => {
      if (!patientId) {
        toast.error('Patient ID is missing.');
        return;
      }
  
      try {
        const response = await deletePatientProfile(patientId);
    
        if (response.status === 200) {
          toast.success("Profile deleted successfully!");
          console.log("in delete")
          sessionStorage.clear(); 
          setSelectedComponent(null)
          // Ensure the component is unmounted before navigating
          navigate("/", { replace: true });
        } else {
          toast.error("Failed to delete profile.");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the profile.");
      }
  }
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-center text-gray-700 text-xl font-bold mb-6">
              Delete Profile
            </h2>
            <div className="text-center">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                // Disable button while deleting
              >
                Confirm Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default DeleteProfile;