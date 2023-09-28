const getDayName=(date)=>["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(date).getDay()];
const getMonthName = (date) => [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
][new Date(date).getMonth()]

export { getDayName, getMonthName }