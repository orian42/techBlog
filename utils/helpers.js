module.exports = {
    //Formats date to a "reading-friendlier" version
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
          new Date(date).getFullYear()
        }`;
      },
}