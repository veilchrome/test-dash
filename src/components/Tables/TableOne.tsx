import { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  name: {
    first: string;
    last: string;
  };
  login: {
    username: string;
  };
  email: string;
  registered: {
    date: string;
  };
  picture: {
    thumbnail: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
}

const TableOne: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api/?results=100");
        setUserData(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Active User
      </h4>

      <div className="flex flex-col">
        {/* Table header */}
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
          {/* Table header cells */}
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Username
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Registration Date
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Address
            </h5>
          </div>
        </div>

        {/* Table body */}
        {currentItems.map((user, index) => (
          <div
            className={`grid grid-cols-5 ${
              index === currentItems.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={index}
          >
            {/* Adjust cells based on your data */}
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img
                  src={user.picture.thumbnail}
                  alt="Profile"
                  className="rounded-full h-8 w-8"
                />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {`${user.name.first} ${user.name.last}`}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.login.username}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{user.email}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{new Date(user.registered.date).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-4" aria-label="Pagination">
        <ul className="flex justify-center">
          {Array.from({ length: Math.ceil(userData.length / itemsPerPage) }, (_, i) => (
            <li key={i}>
              <button
                onClick={() => paginate(i + 1)}
                className={`${
                  i + 1 === currentPage ? "text-blue-600" : "text-gray-700"
                } px-3 py-1 hover:text-blue-600 focus:outline-none focus:text-blue-600`}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOne;
