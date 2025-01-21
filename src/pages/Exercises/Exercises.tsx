import React, { useEffect, useState } from 'react';
import TableTwo from '../../components/Tables/TableTwo';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { exerciseColumns } from '../../data/columns/columns';
import axios from 'axios';
import Swal from 'sweetalert2';
// const baseUrl = import.meta.env.VITE_API_URL;

import { MdRemoveRedEye } from 'react-icons/md';
import { MdEditSquare } from 'react-icons/md';
import { MdAutoDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Exercises: React.FC = () => {
  const navigate = useNavigate();

  const token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzczY2M0OTEwMDA0MWFlMWU2ZTVkMjAiLCJpYXQiOjE3MzczNzA1NjAsImV4cCI6MTc2ODkyODE2MH0.oRNJlJyQBirUGDyb7O05c9LZPFiG1K18kOcIIG5TW9U';
  const baseUrl: string = 'http://localhost:4001/api';

  const [exerciseData, setExerciseData] = useState([]);
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [dataCount, setDataCount] = useState<number>(0);
  const [date, setDate] = useState<string>('');

  const actionsData = [
    {
      name: 'View',
      handler: (item: object) => {
        console.log('view handler: ', item);
      },
      icon: <MdRemoveRedEye className="text-lg text-blue-500" />,
    },
    {
      name: 'Edit',
      handler: (item: object) => {
        navigate('update', { state: item });
      },
      icon: <MdEditSquare className="text-lg text-slate-500" />,
    },
    {
      name: 'Delete',
      handler: (item: object) => {
        deleteHandler(item._id);
      },
      icon: <MdAutoDelete className="text-lg text-red-500" />,
    },
  ];

  const fetchExercises = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${baseUrl}/exercise?page=${pageNumber}&limit=${pageLimit}`,
        data: { date },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Exercises Response: ', response);
      if (response.status === 200) {
        setExerciseData(response.data.data.exercises);
        setTotalPages(response.data.data.pagination.totalPages);
        setDataCount(response.data.data.pagination.totalExercises);
      }
    } catch (error) {
      console.log('Failed while fetching exercises');
    }
  };

  const deleteExercise = async (id: string) => {
    try {
      let response = await axios({
        method: 'DELETE',
        url: `${baseUrl}/exercise/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        await Swal.fire({
          title: 'Deleted!',
          text: 'Exercise has been deleted.',
          icon: 'success',
          confirmButtonColor: '#3C50E0',
        });
        setExerciseData(exerciseData.filter(({ _id }) => id !== _id));
      }
    } catch (error) {
      console.log('Failed while deleting exercise: ', error);
      await Swal.fire({
        title: 'Failed!',
        text: 'Something went wrong while deleting exercise.',
        icon: 'error',
        confirmButtonColor: '#3C50E0',
      });
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this exercise?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3C50E0',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        deleteExercise(id);
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the exercise. Please try again.',
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [pageNumber, pageLimit, date]);

  return (
    <>
      <Breadcrumb pageName="Exercises" />

      <div className="flex flex-col gap-10">
        <TableTwo
          title="Exercises"
          btnPath="/exercises/create"
          columns={exerciseColumns}
          data={exerciseData}
          actions={actionsData}
          settings={{
            pageLimit,
            setPageLimit,
            pageNumber,
            setPageNumber,
            totalPages,
            setTotalPages,
            dataCount,
            setDataCount,
          }}
        />
      </div>
    </>
  );
};

export default Exercises;
