import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Input from '../../components/Input/Input';
import TextArea from '../../components/TextArea/TextArea';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { IoIosCloseCircle } from 'react-icons/io';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();

  const token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzczY2M0OTEwMDA0MWFlMWU2ZTVkMjAiLCJpYXQiOjE3MzczNzA1NjAsImV4cCI6MTc2ODkyODE2MH0.oRNJlJyQBirUGDyb7O05c9LZPFiG1K18kOcIIG5TW9U';
  const baseUrl: string = 'http://localhost:4001/api';

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    files: [],
  });
  const [loading, setLoading] = useState(false);

  const onChangeFilesHandler = (e: any) => {
    const isMultipleFiles = e.target.multiple;
    if (isMultipleFiles) {
      const multipleFiles = e.target.files;
      console.log(multipleFiles);

      const intoArray = Array.from(multipleFiles);
      if (intoArray.length < 1) {
        toast.error('Please upload at least one image');
      }
      if (intoArray.length > 10) {
        toast.error('You can upload only 10 images');
      } else {
        setFiles(intoArray);
      }
    }
  };

  const createPost = async () => {
    try {
      let response = await axios({
        method: 'POST',
        url: `${baseUrl}/post`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Created Post:', response);
      if (response.status === 201) {
        toast.success('Post Created');
        setTimeout(() => {
          navigate('/posts');
        }, 2000);
      }
    } catch (error) {
      console.log('Failed while creating post:', error);
      toast.error('Failed while creating post');
    } finally {
      setLoading(false);
    }
  };

  const uploadFiles = async () => {
    const filesData = new FormData();
    files.map((file, _) => {
      filesData.append('files', file);
    });

    try {
      let response = await axios({
        method: 'POST',
        url: `${baseUrl}/post/uploads/posts`,
        data: filesData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post Files: ', response);
      if (response.status === 200) {
        setFormData((prevData) => ({
          ...prevData,
          files: response.data.data,
        }));
      }
    } catch (error) {
      console.log('Failed while uploading files: ', error);
      toast.error('Failed while uploading files');
      setLoading(false);
    }
  };

  const createExerciseHandler = (e: any) => {
    e.preventDefault();
    if (files.length < 1) {
      toast.error('Please upload at least one file');
    }
    if (files.length > 10) {
      toast.error('You can upload only 10 files');
    }
    setLoading(true);
    uploadFiles();
  };

  const removeFile = (file: object) => {
    setFiles(files.filter(({ name }) => name !== file.name));
  };

  useEffect(() => {
    if (formData.files.length > 0) {
      if (thumbnail.length > 0) {
        uploadThumbnail();
      } else {
        createExercise();
      }
    }
  }, [formData.files]);

  useEffect(() => {
    if (formData.thumbnail !== '') {
      createExercise();
    }
  }, [formData.thumbnail]);

  useEffect(() => {
    setFormData((preData) => ({
      ...preData,
      exerciseName: exerciseTypeOptions[0],
      difficultyLevel: difficultyLevelOptions[0],
    }));
  }, []);

  return (
    <>
      <Toaster />
      <Breadcrumb pageName="Create Exercise" />

      <div className="grid">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Exercise Form
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <Select
                      id="exerciseName"
                      label="Exercise Name"
                      name="exerciseName"
                      placeholder="Select Type"
                      options={exerciseTypeOptions}
                      value={formData.exerciseName}
                      required={true}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          exerciseName: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <Input
                      id="bodyEmphasis"
                      label="Body Emphasis"
                      name="bodyEmphasis"
                      type="text"
                      placeholder="Enter body emphasis"
                      value={formData.bodyEmphasis}
                      required={true}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          bodyEmphasis: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <Select
                      id="difficultyLevel"
                      label="Difficulty Level"
                      name="difficultyLevel"
                      placeholder="Select Difficulty Level"
                      required={true}
                      options={difficultyLevelOptions}
                      value={formData.difficultyLevel}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          difficultyLevel: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <Input
                      id="duration"
                      label="Duration"
                      name="duration"
                      type="time"
                      placeholder="Select Duration"
                      required={true}
                      value={formData.duration}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          duration: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <div>
                      <label
                        htmlFor="files"
                        className="mb-3 block text-black dark:text-white"
                      >
                        Select Files
                        <span
                          className={
                            files.length > 0 ? 'text-green-500' : 'text-red-500'
                          }
                        >
                          {' '}
                          *{' '}
                        </span>
                      </label>
                      <input
                        id="files"
                        type="file"
                        multiple
                        onChange={onChangeFilesHandler}
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="flex py-3 gap-3 items-center justify-start flex-wrap">
                      {files.length > 0 &&
                        files.map((file, index) => {
                          return (
                            file.type === 'video/mp4' && (
                              <div key={index}>
                                <video
                                  key={index}
                                  src={URL.createObjectURL(file)}
                                  onClick={() => {
                                    removeFile(file);
                                  }}
                                  className="h-20 cursor-pointer opacity-60"
                                ></video>
                                <span
                                  onClick={() => {
                                    removeFile(file);
                                  }}
                                  className="text-primary hover:text-red-500 transition-all flex items-center justify-center p-2 text-2xl cursor-pointer"
                                >
                                  <IoIosCloseCircle />
                                </span>
                              </div>
                            )
                          );
                        })}
                      {files.length > 0 &&
                        files.map((file: object, index: number) => {
                          return (
                            file.type !== 'video/mp4' && (
                              <div key={index}>
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  onClick={() => {
                                    removeFile(file);
                                  }}
                                  className="h-20 cursor-pointer opacity-60"
                                />
                                <span
                                  onClick={() => {
                                    removeFile(file);
                                  }}
                                  className="text-primary hover:text-red-500 transition-all flex items-center justify-center p-2 text-2xl cursor-pointer"
                                >
                                  <IoIosCloseCircle />
                                </span>
                              </div>
                            )
                          );
                        })}
                    </div>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label
                      htmlFor="thumbnail"
                      className="mb-3 block text-black dark:text-white"
                    >
                      Thumbnail (Optional)
                    </label>
                    <input
                      id="thumbnail"
                      type="file"
                      onChange={onChangeFilesHandler}
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <TextArea
                  id="notes"
                  label="Notes"
                  name="notes"
                  rows={5}
                  placeholder="Type exercise note"
                  value={formData.notes}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      notes: e.target.value,
                    });
                  }}
                />

                <div className="flex items-center justify-end gap-3">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    onClick={() => {
                      navigate('/exercises');
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={createExerciseHandler}
                    type="submit"
                    disabled={loading}
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  >
                    {loading ? 'Creating...' : 'Create Exercise'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
