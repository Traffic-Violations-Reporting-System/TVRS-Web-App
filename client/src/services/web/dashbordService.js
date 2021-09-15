import http from '../httpService';
const config = require("../../config.json");

export async function getTotalCasesLineChart() {
  return await http.get(`${config["BASEURL"]}`+'/'+'web/dashboard/level/totalCasesLineChart');
}
export async function getCasesSummaryLineChart() {
  return await http.get(`${config["BASEURL"]}`+'/'+'web/dashboard/level/casesSummaryLineChart');
}
export async function getGenderBasedanalysisBarchart() {
  return await http.get(`${config["BASEURL"]}`+'/'+'web/dashboard/level/genderBasedanalysisBarchart');
}
export async function getNumberOfAccidentsInThisYearBarchart() {
  return await http.get(`${config["BASEURL"]}`+'/'+'web/dashboard/level/numberOfAccidentsInThisYearBarchart');
}

//admin
export async function adminUserAnalysisBarChart() {
  return await http.get(`${config["BASEURL"]}`+'/'+'web/dashboard/admin/userAnalysisBarChart');
}
export async function adminTotalMobileUsersLineChart() {
  return await http.get(`${config["BASEURL"]}`+'/'+'web/dashboard/admin/totalMobileUsers');
}
