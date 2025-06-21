import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db, auth } from "../../firebase-config"; // Assuming correct path

const BalloonsItemsSection = () => {
  const storage = getStorage();
  // Renamed state from balloons to geoites
  const [geoites, setGeoites] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [user, setUser] = useState(null);
  // Renamed loadingBalloons to loadingGeoites
  const [loadingGeoites, setLoadingGeoites] = useState(true);
  const [loadingMarkers, setLoadingMarkers] = useState(true);

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold the ID of the item being edited (can be geoite or marker)
  const [editingItemId, setEditingItemId] = useState(null);
  // State to track if the current edit is for a 'geoite' or 'marker'
  const [editingItemType, setEditingItemType] = useState(null); // 'geoite' or 'marker'
  // State to hold form data for the modal inputs
  const [formData, setFormData] = useState({
    object_name: "",
    object_code: "",
    object_description: "",
    latitude: "",
    longitude: "",
    imageUrl: "", // Used for markers to display in modal, not directly edited here
  });

  // Effect to listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoadingGeoites(false); // Updated here
      setLoadingMarkers(false);
    });
    return () => unsubscribe();
  }, []);

  // Effect to fetch Geoites data when user changes
  useEffect(() => {
    if (user) {
      const fetchGeoitesData = async () => {
        setLoadingGeoites(true); // Updated here
        try {
          // Changed collection name from "balloons" to "geoites"
          const geoitesCollection = collection(db, "geoites");
          const q = query(geoitesCollection, where("user_id", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGeoites(data); // Updated here
        } catch (error) {
          console.error("Error fetching geoites:", error);
          alert("Error fetching AR Geoites: " + error.message);
        } finally {
          setLoadingGeoites(false); // Updated here
        }
      };
      fetchGeoitesData();
    } else {
      setGeoites([]); // Updated here
      setLoadingGeoites(false); // Updated here
    }
  }, [user]);

  // Effect to fetch Markers data when user changes
  useEffect(() => {
    if (user) {
      const fetchMarkersData = async () => {
        setLoadingMarkers(true);
        try {
          const markersCollection = collection(db, "markers");
          const q = query(markersCollection, where("user_id", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMarkers(data);
        } catch (error) {
          console.error("Error fetching markers:", error);
          alert("Error fetching AR Markers: " + error.message);
        } finally {
          setLoadingMarkers(false);
        }
      };
      fetchMarkersData();
    } else {
      setMarkers([]);
      setLoadingMarkers(false);
    }
  }, [user]);

  // Handler for when an input field changes in the modal form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for Edit button click - opens the modal
  const handleEdit = (item, type) => {
    setEditingItemId(item.id);
    setEditingItemType(type); // Set the type of item being edited ('geoite' or 'marker')
    setFormData({
      object_name: item.object_name || "",
      object_code: item.object_code || "",
      object_description: item.object_description || "",
      latitude: item.latitude || "",
      longitude: item.longitude || "",
      imageUrl: item.image_url || "", // Populate image URL if it's a marker
    });
    setIsModalOpen(true); // Open the modal
  };

  // Handler for Save Changes button click in the modal
  const handleSave = async () => {
    try {
      if (!editingItemId || !editingItemType) {
        console.error("No item ID or type found for saving.");
        alert("Error: No AR item selected for saving.");
        return;
      }

      // Changed collection name logic
      const collectionName =
        editingItemType === "geoite" ? "geoites" : "markers";
      const itemRef = doc(db, collectionName, editingItemId);

      const updateData = {
        object_name: formData.object_name,
        object_code: formData.object_code,
        object_description: formData.object_description,
      };

      // Apply latitude and longitude only if editing a 'geoite'
      if (editingItemType === "geoite") {
        updateData.latitude = parseFloat(formData.latitude);
        updateData.longitude = parseFloat(formData.longitude);
      }
      // Note: imageUrl is not updated via this modal as per your existing logic.

      await updateDoc(itemRef, updateData);
      console.log(
        `Document updated in ${collectionName} with ID:`,
        editingItemId
      );
      alert(
        `${
          editingItemType === "geoite" ? "AR Geoite" : "AR Marker" // Updated alert message
        } updated successfully!`
      );

      // Update the local state to reflect changes immediately
      if (editingItemType === "geoite") {
        setGeoites(
          (
            prevGeoites // Updated state setter
          ) =>
            prevGeoites.map((geoite) =>
              geoite.id === editingItemId
                ? {
                    ...geoite,
                    ...updateData,
                  }
                : geoite
            )
        );
      } else if (editingItemType === "marker") {
        setMarkers((prevMarkers) =>
          prevMarkers.map((marker) =>
            marker.id === editingItemId
              ? {
                  ...marker,
                  ...updateData,
                }
              : marker
          )
        );
      }

      setIsModalOpen(false); // Close modal
      setEditingItemId(null); // Clear editing state
      setEditingItemType(null);
      setFormData({
        // Reset form data
        object_name: "",
        object_code: "",
        object_description: "",
        latitude: "",
        longitude: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error updating AR item: ", error);
      alert(`Error updating AR item: ${error.message}`);
    }
  };

  // Handler for Cancel button click in the modal
  const handleCancelEdit = () => {
    setIsModalOpen(false); // Close modal
    setEditingItemId(null); // Clear editing state
    setEditingItemType(null);
    setFormData({
      // Reset form data
      object_name: "",
      object_code: "",
      object_description: "",
      latitude: "",
      longitude: "",
      imageUrl: "",
    });
  };

  // Handler for Delete button click
  const handleDelete = async (id, type, imageUrl = null) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this AR ${
        type === "geoite" ? "Geoite" : "Marker" // Updated confirmation message
      }?`
    );
    if (!confirmDelete) {
      return;
    }

    // Changed collection name logic
    const collectionName = type === "geoite" ? "geoites" : "markers";
    const docRef = doc(db, collectionName, id);

    try {
      // If it's a marker, also delete the image from Firebase Storage
      if (type === "marker" && imageUrl) {
        const imageStorageRef = ref(storage, imageUrl);
        await deleteObject(imageStorageRef);
        console.log("Image deleted from storage:", imageUrl);
      }

      await deleteDoc(docRef);
      console.log(`Document deleted from ${collectionName} with ID:`, id);
      alert(
        `AR ${type === "geoite" ? "Geoite" : "Marker"} deleted successfully!` // Updated alert message
      );

      // Update the local state
      if (type === "geoite") {
        setGeoites(
          (
            prevGeoites // Updated state setter
          ) => prevGeoites.filter((geoite) => geoite.id !== id)
        );
      } else if (type === "marker") {
        setMarkers((prevMarkers) =>
          prevMarkers.filter((marker) => marker.id !== id)
        );
      }
    } catch (error) {
      console.error(`Error deleting ${type}: `, error);
      alert(`Error deleting ${type}: ${error.message}`);
    }
  };

  return (
    <div>
      {user ? (
        <>
          {/* --- AR Geoites (formerly Balloons) Section --- */}
          <h1 className="text-5xl font-extrabold text-center mt-16 mb-12 pb-4 border-b-4 border-red-700 text-red-700 mx-auto max-w-4xl">
            Your AR Geoites
          </h1>
          <section
            id="Geoites" // Changed ID for consistency
            className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5 min-h-[300px]"
          >
            {loadingGeoites ? ( // Updated loading state
              <div className="col-span-full text-center py-20">
                <p className="text-2xl text-gray-600">
                  Loading your AR Geoites data...
                </p>
              </div>
            ) : geoites.length > 0 ? ( // Updated state to iterate over
              geoites.map(
                (
                  geoite // Changed variable name
                ) => (
                  <div
                    key={geoite.id}
                    className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl h-[350px] flex flex-col"
                  >
                    <img
                      src="https://img.freepik.com/free-vector/gradient-cybersickness-illustration_52683-137616.jpg?t=st=1709822343~exp=1709825943~hmac=0881dc14c662f1a3246e3294e74b779f9e552e1c063a47957aac2ac7e7005b2b&w=740"
                      alt="AR Geoite" // Updated alt text
                      className="h-36 w-72 object-cover rounded-t-xl"
                    />
                    <div className="px-4 py-3 w-72 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <span className="text-gray-400 mr-3 uppercase text-xs">
                          AR Geoite {/* Changed text */}
                        </span>
                        <p className="text-lg font-bold text-red-500 truncate block capitalize">
                          Geoite Name: {geoite.object_name}{" "}
                          {/* Changed text and variable */}
                        </p>
                        <p className="text-base font-semibold text-black cursor-auto my-1">
                          Object Code: {geoite.object_code}{" "}
                          {/* Changed variable */}
                        </p>
                        <p className="text-base font-semibold text-black cursor-auto my-1">
                          Latitude: {geoite.latitude} {/* Changed variable */}
                        </p>
                        <p className="text-base font-semibold text-black cursor-auto my-1">
                          Longitude: {geoite.longitude} {/* Changed variable */}
                        </p>
                      </div>
                      <div className="flex items-center mt-3">
                        <div className="ml-auto">
                          <button
                            onClick={() => handleEdit(geoite, "geoite")} // Pass 'geoite' type
                            className="text-blue-500 mr-2 px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(geoite.id, "geoite")} // Pass 'geoite' type
                            className="text-red-500 px-3 py-1 rounded-full bg-red-100 hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="col-span-full text-center py-20 flex items-center justify-center h-full">
                <p className="text-2xl text-gray-600">
                  It looks like you don't have any AR Geoites yet. Time to add
                  some!
                </p>
              </div>
            )}
          </section>

          {/* --- AR Markers Section --- */}
          {/* <h1 className="text-5xl font-extrabold text-center mt-16 mb-12 pb-4 border-b-4 border-green-700 text-green-700 mx-auto max-w-4xl">
            Your AR Markers
          </h1>
          <section
            id="Markers"
            className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5 min-h-[300px]"
          >
            {loadingMarkers ? (
              <div className="col-span-full text-center py-20">
                <p className="text-2xl text-gray-600">
                  Loading your AR Markers data...
                </p>
              </div>
            ) : markers.length > 0 ? (
              markers.map((marker) => (
                <div
                  key={marker.id}
                  className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl h-[350px] flex flex-col"
                >
                  <img
                    src={marker.image_url}
                    alt="Marker"
                    className="h-36 w-72 object-cover rounded-t-xl"
                  />
                  <div className="px-4 py-3 w-72 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <span className="text-gray-400 mr-3 uppercase text-xs">
                        AR Marker
                      </span>
                      <p className="text-lg font-bold text-green-500 truncate block capitalize">
                        Object Name: {marker.object_name}
                      </p>
                      <p className="text-base font-semibold text-black cursor-auto my-1">
                        Object Code: {marker.object_code}
                      </p>
                    </div>
                    <div className="flex items-center mt-3">
                      <div className="ml-auto">
                        <button
                          onClick={() => handleEdit(marker, "marker")}
                          className="text-blue-500 mr-2 px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(marker.id, "marker", marker.image_url)
                          }
                          className="text-red-500 px-3 py-1 rounded-full bg-red-100 hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 flex items-center justify-center h-full">
                <p className="text-2xl text-gray-600">
                  It looks like you don't have any AR Markers yet. Time to add
                  some!
                </p>
              </div>
            )}
          </section> */}
        </>
      ) : (
        <div className="col-span-full text-center py-20 min-h-[500px] flex flex-col justify-center items-center">
          <p className="text-2xl font-bold text-red-500">
            Please log in to view your AR content.
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Don't have an account? Sign up to start tracking your AR Geoites and
            Markers!
          </p>
        </div>
      )}

      {/* --- Modal Component --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">
              Edit AR {editingItemType === "geoite" ? "Geoite" : "Marker"}{" "}
              {/* Updated modal title */}
            </h2>
            <div className="mb-4">
              <label
                htmlFor="object_name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Object Name:
              </label>
              <input
                type="text"
                id="object_name"
                name="object_name"
                value={formData.object_name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="object_code"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Object Code:
              </label>
              <input
                type="text"
                id="object_code"
                name="object_code"
                value={formData.object_code}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="object_description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Object Description:
              </label>
              <textarea
                id="object_description"
                name="object_description"
                value={formData.object_description}
                onChange={handleChange}
                rows="3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y"
              ></textarea>
            </div>
            {editingItemType === "geoite" && ( // Conditional rendering for geoite-specific fields
              <>
                <div className="mb-4">
                  <label
                    htmlFor="latitude"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Latitude:
                  </label>
                  <input
                    type="number"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    step="any"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="longitude"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Longitude:
                  </label>
                  <input
                    type="number"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    step="any"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleCancelEdit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center py-10 px-10"></div>
    </div>
  );
};

export default BalloonsItemsSection;
