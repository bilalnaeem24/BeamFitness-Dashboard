import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const UserDetails = () => {
  const location = useLocation();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (location.state) {
      setData(location.state);
    }
  }, []);

  return (
    <>
      <Breadcrumb pageName="User Details" />

      <div className="flex flex-col gap-10">
        <div className="bg-white shadow rounded-lg p-6">
          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <div>
                <h2 className="text-lg font-semibold text-gray-800">User ID</h2>
                <p className="text-gray-600">{data._id}</p>
              </div> */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Full Name
                </h2>
                <p className="text-gray-600">{`${data.firstName} ${data.lastName}`}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Email Address
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                  {data.email}
                  {data.isEmailVerified ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <IoClose className="text-red-500" />
                  )}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Phone Number
                </h2>
                <p className="text-gray-600">{data.phone}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Is Subscribed
                </h2>
                <p className="text-gray-600">
                  {data.isSubscribed ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <IoClose className="text-red-500" />
                  )}{' '}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Subscription Plan
                </h2>
                <p className="text-gray-600">{data.subscriptionPlan}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Roles</h2>
                <p className="text-gray-600 capitalize">
                  {data.roles.map((role: string) => {
                    return role;
                  })}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">About</h2>
                <p className="text-gray-600">{data.about ? data.about : '-'}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Created At
                </h2>
                <p className="text-gray-600">
                  {Date(data.createdAt).toString().split(' GMT')[0]}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Last Updated At
                </h2>
                <p className="text-gray-600">
                  {Date(data.updatedAt).toString().split(' GMT')[0]}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Is Deleted
                </h2>
                <p className="text-gray-600">
                  {data.deleted ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <IoClose className="text-red-500" />
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
