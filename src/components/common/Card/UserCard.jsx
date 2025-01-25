import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import ProfilePlaceholder from "../../../assets/images/profile-placeholder.png";


const UserCard = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser({
            name: currentUser.displayName || "User",
            email: currentUser.email,
            profilePicture: currentUser.photoURL || ProfilePlaceholder,
          });
        } else {
          setUser(null);
        }
      });
  
      return () => unsubscribe();
    }, []);

  return (
    <div>
      {user && (
        <div className="flex items-center w-full gap-2">
          <img
            src={user.profilePicture}
            alt="User Profile"
            className="w-9 h-9 rounded-full"
          />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-500 text-xs">{user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
