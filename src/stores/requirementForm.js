import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import { sessionStore } from "./session";

export const requiFormStore = defineStore("requiFormStore", {
  state: () => ({
    getComp: [],
    interviewRound: [],
    modeOfHiring: [],
    interviewType: [],
    shifts: [],
    courese: [],
    subject: [],
    missedCallList: [],
    gender: [],
    graduType: [],
    masterCategory: [],
    degreeCategory: [],
    designationArr: [],
    interviewLocation: [],
    jobLocation: [],
    yop: [],
    bachelorDegree: [],
    bachelorStream: [],
    masterDegree: [],
    masterStream: [],
    pageCount: [],
    certificateArr: [],
    organization : []
  }),

  //http://106.51.74.69:8787/familiar/companylist/

  actions: {
    async getCompanies(data) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/familiar/companylist/?per_page=200`,
            {
              headers: headers,
            }
          );

          this.getComp = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },
    async getInterviewRounds(data) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/familiar/interview-rounds/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.interviewRound = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getModeofHiring(data) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/familiar/mode-of-hiring/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.modeOfHiring = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getInterviewType(data) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/familiar/mode-of-interview/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.interviewType = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getCourses(data) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/courses/courses/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.courese = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getCertificate() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/bd/certificate/`,
            {
              headers: headers,
            }
          );
          this.certificateArr = response.data.results;
          return response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getGender(data) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/commons/gender/`,
            {
              headers: headers,
            }
          );
          this.gender = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },
    async getCities(data) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/commons/cities/?per_page=200`,
            {
              headers: headers,
            }
          );
          return response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getGraduationType() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/familiar/graduationtype/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.graduType = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getOrganisation() {
      
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        console.log("token===>",headers);
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/branches/organisation/`,
            { headers: headers }
          );
          
          this.organization = response.data.results;
         console.log(":getOrganisation", this.organization);
          
        } catch (err) {
          console.log("errors", err);
        }
      }
    },
    async getDesignation() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/commons/designation/`,
            {
              headers: headers,
            }
          );
          this.designationArr = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getSubject() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/courses/subject/?per_page=200`
          );
          this.subject = response.data.results;
          console.log("asdfghjiruthnet9486704867j oghnsoing s", this.subject);
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getShifts() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/bd/shift/`
          );
          this.shifts = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },
    // async getOrganisation() {
    //   const user = sessionStore();
    //   const token = user.user.token;
    //   if (token) {
    //     const headers = {
    //       Authorization: `Token ${token}`,
    //     };
    //     try {
    //       const response = await axios.get(
    //         `http://106.51.74.69:8787/branches/organisation/`
    //       );
    //       return response.data.results;
    //     } catch (err) {
    //       console.log("errors", err);
    //     }
    //   }
    // },

    async getDegreeCategory() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/familiar/categorylist/?type=degree`
          );
          console.log(
            "response.data.resultsresponse.data.resultsresponse.data.resultsresponse.data.resultsresponse.data.results",
            response.data.results
          );
          this.degreeCategory = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },
    async getMasterCategory() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `http://106.51.74.69:8787/familiar/categorylist/?type=masters`
          );
          console.log(
            "response.data.resultsresponse.data.resultsresponse.data.resultsresponse.data.resultsresponse.data.results",
            response.data.results
          );
          this.masterCategory = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async postRequirementForm(data) {
      console.log("!@#$%^&*()_+", data);
      const user = sessionStore();

      const token = user.user.token;
      console.log(data);
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          console.log("headers======>", headers);
          const response = await axios.post(
            "http://106.51.74.69:8787/bd/add-requirement/",
            data,
            { headers }
          );
          console.log(response.data);
          return response.data.message;
        } catch (error) {
          console.log(error.response);
        }
      }
    },
    async getMissedCallList(count = 1) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(
            `http://106.51.74.69:8787/callrecord/get-missed-calls/?page=${count}&per_page=${25}`,
            { headers }
          );

          this.pageCount = records.data.total;
          console.log("this.pageCountthis.pageCount>>>", this.pageCount);
          this.missedCallList = records.data.results;
          console.log(this.missedCallList);
        } catch (err) {
          console.log("errors", err);
        }
      }
    },
    async getInterviewLocation() {
      console.log("QWERTYUIOP!@#$%^&*()_ASDFVGBHNJML:");
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(
            `http://106.51.74.69:8787/commons/cities/?per_page=200`,
            { headers }
          );

          this.interviewLocation = records.data.results;
          console.log(
            "QWERTYUIOP!@#$%^&*()_ASDFVGBHNJML:",
            this.interviewLocation
          );
        } catch (err) {
          console.log("errors", err);
        }
      }
    },
    async getJobLocation() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(
            `http://106.51.74.69:8787/commons/cities/?per_page=200`,
            { headers }
          );

          this.jobLocation = records.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getYop() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(`http://106.51.74.69:8787/bd/yop/`);
          this.yop = records.data.results;
          console.log("recordsss>>>>>>>>>>>>>>>>", records, this.yop);
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    // bachelor-degree
    async getbachelorDegree() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(
            `http://106.51.74.69:8787/education/degree/?qualification_type=Degree`
          );

          this.bachelorDegree = records.data.results;
          return records.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    // bachelor-stream
    async getbachelorStream() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(
            `http://106.51.74.69:8787/education/streams/?qualification_type=Degree`
          );

          this.bachelorStream = records.data.results;
          return records.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    // master-degree
    async getMasterDegree() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(
            `http://106.51.74.69:8787/education/degree/?qualification_type=Masters`
          );

          this.masterDegree = records.data.results;
          return records.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },
    // master-stream
    async getMasterStream() {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(
            `http://106.51.74.69:8787/education/streams/?qualification_type=Masters`
          );

          this.masterStream = records.data.results;
          return records.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },
    
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(requiFormStore, import.meta.hot));
}
