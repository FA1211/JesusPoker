const spreadsheetId = "1CxHhgfIgff9GrCugUMaTe8h65KO82eNqiBMCAC4P16Q"
const API_KEY = "AIzaSyBr8PUmFzHxmsMmv7OUL_XgVT0VPk3KsiE"
export const spreadsheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${API_KEY }`