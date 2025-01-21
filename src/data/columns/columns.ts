interface Column {
  headerName: string;
  fieldName: string;
  otherFieldName?: string;
}

export const exerciseColumns: Column[] = [
  {
    headerName: 'No.',
    fieldName: 'no.',
  },
  {
    headerName: 'Thumbnail',
    fieldName: 'thumbnail',
  },
  {
    headerName: 'Exercise Name',
    fieldName: 'exerciseName',
  },
  {
    headerName: 'Body Emphasis',
    fieldName: 'bodyEmphasis',
  },
  {
    headerName: 'Difficulty Level',
    fieldName: 'difficultyLevel',
  },
  {
    headerName: 'Duration',
    fieldName: 'duration',
  },
  {
    headerName: 'Actions',
    fieldName: 'actions',
  },
];

export const classColumns: Column[] = [
  {
    headerName: 'No.',
    fieldName: 'no.',
  },
  {
    headerName: 'Thumbnail',
    fieldName: 'thumbnail',
  },
  {
    headerName: 'Class Name',
    fieldName: 'className',
  },
  {
    headerName: 'Class Type',
    fieldName: 'classType',
  },
  {
    headerName: 'Difficulty Level',
    fieldName: 'difficultyLevel',
  },
  {
    headerName: 'Time',
    fieldName: 'time',
  },
  {
    headerName: 'Actions',
    fieldName: 'actions',
  },
];

export const postColumns: Column[] = [
  {
    headerName: 'No.',
    fieldName: 'no.',
  },
  {
    headerName: 'User',
    fieldName: `userId.firstName`,
    otherFieldName: `userId.lastName`,
  },
  {
    headerName: 'Title',
    fieldName: 'title',
  },
  {
    headerName: 'Likes',
    fieldName: 'likes',
  },
  {
    headerName: 'Dislikes',
    fieldName: 'dislikes',
  },
  {
    headerName: 'Comments',
    fieldName: 'comments',
  },
  {
    headerName: 'Actions',
    fieldName: 'actions',
  },
];

export const userColumns: Column[] = [
  {
    headerName: 'No.',
    fieldName: 'no.',
  },
  {
    headerName: 'Full Name',
    fieldName: `firstName`,
    otherFieldName: `lastName`,
  },
  {
    headerName: 'Email',
    fieldName: 'email',
  },
  {
    headerName: 'Phone',
    fieldName: 'phone',
  },
  {
    headerName: 'Role',
    fieldName: `roles`,
  },
  {
    headerName: 'Subscription',
    fieldName: 'subscriptionPlan',
  },
  {
    headerName: 'Actions',
    fieldName: 'actions',
  },
];
