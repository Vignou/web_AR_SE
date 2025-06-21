import React, { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db, auth } from "../../firebase-config"; // Import auth from Firebase

const ARObjectItemsSectionBeta1 = () => {
  const [arObjects, setArObjects] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const arObjectsCollection = collection(db, "arObjects");
        const q = query(
          arObjectsCollection,
          where("userName", "==", user.displayName)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setArObjects(data);
      };

      fetchData();
    } else {
      setArObjects([]);
    }
  }, [user]);

  return (
    <div>
      {/* <!-- source: https://github.com/mfg888/Responsive-Tailwind-CSS-Grid/blob/main/index.html --> */}

      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">
          Responsive Product card grid
        </h1>
        <h1 className="text-3xl">Tailwind CSS</h1>
      </div>

      {/* <!-- ✅ Grid Section - Starts Here 👇 --> */}
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {/* <!--   ✅ Product card 1 - Starts Here 👇 --> */}
        {/* w-72 */}
        {arObjects.map((object) => (
          <div
            key={object.id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="Product"
              //h-72 w-72
              className="h-40 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                AR-Objects
              </span>
              <p className="text-lg font-bold text-teal-500 truncate block capitalize">
                Object-Name: {object.name}
              </p>
              <p className="text-base font-semibold text-black cursor-auto my-1">
                Latitude: {object.latitude}
              </p>
              <p className="text-base font-semibold text-black cursor-auto my-1">
                Longtitude: {object.longitude}
              </p>
              <div className="flex items-center mt-3">
                {/* <p className="text-lg font-semibold text-black cursor-auto my-3">
                $149
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
              </del> */}
                <div className="ml-auto">
                  <button className="text-blue-500 mr-2 px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200">
                    Edit
                  </button>
                  <button className="text-red-500 px-3 py-1 rounded-full bg-red-100 hover:bg-red-200">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <!--   🛑 Product card 1 - Ends Here  --> */}
      </section>

      {/* <!-- 🛑 Grid Section - Ends Here --> */}

      {/* <!-- credit --> */}
      <div className="text-center py-10 px-10">
        <h2 className="font-bold text-2xl md:text-4xl mb-4">
          Thanks to{" "}
          <a
            href="https://unsplash.com/@nixcreative"
            className="underline font-black"
          >
            Fellow Comrades
          </a>{" "}
          for those AMAZING collective product images!
        </h2>
      </div>
    </div>
  );
};

export default ARObjectItemsSectionBeta1;
