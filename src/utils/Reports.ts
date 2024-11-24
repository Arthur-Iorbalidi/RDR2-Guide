// import serverAPI from '@src/services/serverAPI';

// const downloadFavoriteMoviesReportPDF = async (
//   unathorizedCallback?: () => void,
// ) => {
//   try {
//     const response =
//       await serverAPI.getFavoriteMoviesReportPdf(unathorizedCallback);

//     const fileName = `favorite_movies.pdf`;

//     const blob = new Blob([response], { type: 'application/pdf' });
//     const link = document.createElement('a');
//     link.href = window.URL.createObjectURL(blob);
//     link.download = fileName;

//     link.click();
//     window.URL.revokeObjectURL(link.href);
//   } catch (error) {
//     console.error('Error downloading the report:', error);
//   }
// };

// const downloadFavoriteMoviesReportDocx = async (
//   unathorizedCallback?: () => void,
// ) => {
//   try {
//     const response =
//       await serverAPI.getFavoriteMoviesReportDocx(unathorizedCallback);

//     const fileName = `favorite_movies.docx`;

//     const blob = new Blob([response], {
//       type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     });
//     const link = document.createElement('a');
//     link.href = window.URL.createObjectURL(blob);
//     link.download = fileName;

//     link.click();
//     window.URL.revokeObjectURL(link.href);
//   } catch (error) {
//     console.error('Error downloading the report:', error);
//   }
// };

// export {
//   downloadFavoriteMoviesReportDocx,
//   downloadFavoriteMoviesReportPDF,
// };
