import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface TableTwoProps {
  title: string;
  btnPath: string;
  columns: { headerName: string; fieldName: string; otherFieldName?: string }[];
  data: any[];
  actions: any[];
  settings: any;
}

const TableTwo: React.FC<TableTwoProps> = ({
  title,
  columns,
  data,
  btnPath,
  actions,
  settings,
}) => {
  const baseUrl: string = 'http://192.168.0.236:4001';
  const navigate = useNavigate();

  const [loaderStatus, setLoaderStatus] = useState(true);

  function getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoaderStatus(false);
    }, 3000);
  }, []);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {/* {title}: Showing {settings.pageLimit} from {settings.dataCount} */}
            {title}
          </h4>
          <button
            onClick={() => {
              navigate(`${btnPath}`);
            }}
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          >
            Create New
          </button>
        </div>

        <div className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
          {columns.map((column, index) => (
            <div
              key={index}
              className="flex items-center font-medium text-black dark:text-white"
            >
              {column.headerName}
            </div>
          ))}
        </div>

        {data.length > 0 ? (
          <>
            {data.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5"
              >
                {columns.map((col, colIndex) => (
                  <div key={colIndex} className="flex items-center">
                    {col.fieldName === 'thumbnail' ? (
                      <img
                        src={baseUrl + row[col.fieldName]}
                        alt={row[col.fieldName]}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    ) : col.fieldName === 'actions' ? (
                      <div className="flex items-center space-x-3.5">
                        {actions &&
                          actions.map((action, actionIndex) => {
                            return (
                              <button
                                key={actionIndex}
                                onClick={() => {
                                  action.handler(row);
                                }}
                              >
                                {action.icon}
                              </button>
                            );
                          })}
                      </div>
                    ) : col.fieldName === 'no.' ? (
                      <p className="text-sm text-black dark:text-white">
                        {`${rowIndex + 1}.`}
                      </p>
                    ) : (
                      // <p className="text-sm text-black dark:text-white">
                      //   {row[col.fieldName]}
                      // </p>
                      <p className="pe-10 text-sm text-black dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                        {`${getNestedValue(row, col.fieldName)} ${
                          col.otherFieldName
                            ? getNestedValue(row, col.otherFieldName)
                            : ''
                        }`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
            <Stack
              spacing={2}
              className="py-3 flex items-end justify-center border-t"
            >
              <Pagination
                count={settings.totalPages}
                onChange={(_, value) => {
                  settings.setPageNumber(value);
                  // console.log('running:', settings);
                }}
                color="primary"
              />
            </Stack>
          </>
        ) : (
          <div className="flex items-center justify-center p-5">
            {loaderStatus ? <Spinner /> : <p>No data available</p>}
          </div>
        )}
      </div>
    </>
  );
};

export default TableTwo;
