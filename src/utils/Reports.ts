import serverAPI from '@src/services/serverAPI';

const downloadFavoriteMoviesReportPDF = async (
  unathorizedCallback?: () => void,
) => {
  try {
    const response =
      await serverAPI.getFavoriteMoviesReportPdf(unathorizedCallback);

    const fileName = `favorite_movies.pdf`;

    const blob = new Blob([response], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    link.click();
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error downloading the report:', error);
  }
};

const downloadFavoriteMoviesReportDocx = async (
  unathorizedCallback?: () => void,
) => {
  try {
    const response =
      await serverAPI.getFavoriteMoviesReportDocx(unathorizedCallback);

    const fileName = `favorite_movies.docx`;

    const blob = new Blob([response], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    link.click();
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error downloading the report:', error);
  }
};

const downloadFavoriteActorsReportPDF = async (
  unathorizedCallback?: () => void,
) => {
  try {
    const response =
      await serverAPI.getFavoriteActorsReportPdf(unathorizedCallback);

    const fileName = `favorite_actors.pdf`;

    const blob = new Blob([response], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    link.click();
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error downloading the report:', error);
  }
};

const downloadFavoriteActorsReportDocx = async (
  unathorizedCallback?: () => void,
) => {
  try {
    const response =
      await serverAPI.getFavoriteActorsReportDocx(unathorizedCallback);

    const fileName = `favorite_actors.docx`;

    const blob = new Blob([response], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    link.click();
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error downloading the report:', error);
  }
};

const downloadFavoriteDirectorsReportPDF = async (
  unathorizedCallback?: () => void,
) => {
  try {
    const response =
      await serverAPI.getFavoriteDirectorsReportPdf(unathorizedCallback);

    const fileName = `favorite_directors.pdf`;

    const blob = new Blob([response], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    link.click();
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error downloading the report:', error);
  }
};

const downloadFavoriteDirectorsReportDocx = async (
  unathorizedCallback?: () => void,
) => {
  try {
    const response =
      await serverAPI.getFavoriteDirectorsReportDocx(unathorizedCallback);

    const fileName = `favorite_directors.docx`;

    const blob = new Blob([response], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    link.click();
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error downloading the report:', error);
  }
};

export {
  downloadFavoriteActorsReportDocx,
  downloadFavoriteActorsReportPDF,
  downloadFavoriteDirectorsReportDocx,
  downloadFavoriteDirectorsReportPDF,
  downloadFavoriteMoviesReportDocx,
  downloadFavoriteMoviesReportPDF,
};
