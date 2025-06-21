import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const MakeARSection = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  const [objectName, setObjectName] = useState("");
  const [objectCode, setObjectCode] = useState("");
  const [objectDescription, setObjectDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Initialized isLoading

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated. Please log in to create a marker.");
      return;
    }

    if (!objectName.trim() || !objectCode.trim() || !objectDescription.trim()) {
      alert("Please fill in all object details.");
      return;
    }

    if (!imageFile) {
      alert("Please upload an image for your marker.");
      return;
    }

    // Client-side validation for file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (imageFile && !allowedTypes.includes(imageFile.type)) {
      alert("Only PNG, JPEG, and JPG images are allowed.");
      setImageFile(null); // Clear the invalid file
      setImagePreview(null);
      return;
    }

    setIsLoading(true); // Set loading to true when submission starts

    try {
      const imageRef = ref(storage, `ar_markers/${uuidv4()}_${imageFile.name}`);

      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      const markerId = uuidv4();
      const timestamp = Date.now();

      const data = {
        marker_id: markerId,
        object_name: objectName.trim(),
        object_code: objectCode.trim(),
        object_description: objectDescription.trim(),
        image_url: imageUrl,
        created_at: timestamp,
        user_id: user.uid,
      };

      await addDoc(collection(db, "markers"), data);

      alert("Marker created successfully!");
      console.log("Marker data uploaded:", data);

      // Reset form fields
      setObjectName("");
      setObjectCode("");
      setObjectDescription("");
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating marker: ", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="w-full lg:w-2/3 h-80 sm:h-auto lg:h-120 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl">
                Upload Image Here
              </div>
            )}
          </div>

          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col w-full py-8">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Create New AR Marker
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label
                  htmlFor="object-name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Object Name
                </label>
                <input
                  type="text"
                  id="object-name"
                  value={objectName}
                  onChange={(e) => setObjectName(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 py-1 px-3"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="object-code"
                  className="leading-7 text-sm text-gray-600"
                >
                  Object Code
                </label>
                <input
                  type="text"
                  id="object-code"
                  value={objectCode}
                  onChange={(e) => setObjectCode(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 py-1 px-3"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="object-description"
                  className="leading-7 text-sm text-gray-600"
                >
                  Object Description
                </label>
                <textarea
                  id="object-description"
                  value={objectDescription}
                  onChange={(e) => setObjectDescription(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 py-1 px-3"
                  rows="3"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="marker-image"
                  className="leading-7 text-sm text-gray-600"
                >
                  Upload Marker Image
                </label>
                <input
                  type="file"
                  id="marker-image"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleImageChange}
                  className="w-full bg-white rounded border border-gray-300 py-1 px-3"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" // Updated button style
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Submitting..." : "Submit"}{" "}
                {/* Button text update */}
              </button>
              {isLoading && <p>Loading...</p>} {/* Loading message display */}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MakeARSection;
