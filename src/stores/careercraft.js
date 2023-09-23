import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import { sessionStore } from "./session";

export const careercStore = defineStore("careercraft", {
  state: () => ({
    clRecords: [],
    clrecordsCount: 0,
    updateStatus: [],
    updateStatusCount: 0,
    nrecords: [],
    nrecordCount: 0,
    categoryStatus: [],
    missedCallList: [],
    companies: [],
    interviewRounds: [],
    modeofHiring: [],
    interviewtype: [],
    courses: [],
    designation: [],
    gender: [],
    organisation: [],
    cities: [],
    graduationtype: [],

    reqList: [],
    reqlistCount: 0,

    reqCategory: [],
  }),
  actions: {
    async getCallRecords(number) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(
            `https://bdbackend.qspiders.com/callrecord/call-record-no-status/`,
            {
              headers: headers,
            }
          );
          this.clRecords = records.data.results;
          this.clrecordsCount = records.data.total;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getUpdateStatus(page = 1) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const calls = await axios.get(
            `https://bdbackend.qspiders.com/callrecord/call-record-no-status/?page=${page}`,
            {
              headers: headers,
            }
          );
          this.updateStatus = calls.data.results;
          this.updateStatusCount = calls.data.total;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getNRecordValues(number) {
      console.log("js number", number);
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          if (number) {
            const records = await axios.get(
              `https://bdbackend.qspiders.com/callrecord/callhistorybd/?number=${number}`,
              {
                headers: headers,
              }
            );
            this.nrecords = records.data.results;
            console.log("recordssss", this.nrecords);
            this.nrecordCount = records.data.total;
          }
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getCategoryStatus() {
      // if (this.categoryStatus.length === 0) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const status = await axios.get(
            "https://bdbackend.qspiders.com/callrecord/category/?per_page=200",
            {
              headers: headers,
            }
          );
          this.categoryStatus = status.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
      // }
    },

    async UpdateStatus(data) {
      console.log("UpdateStatus.........",data);
      const user = sessionStore();
      const token = user.user.token;

      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.post(
            "https://bdbackend.qspiders.com/callrecord/call-record-update-status/",
            data,
            {
              headers: headers,
            }
          );
          this.updatestatus = response.data;
          return this.updatestatus;
        } catch (err) {
          this.error = err.response.data.message;
          return this.error;
        }
      }
    },

    async getCompanies(data) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `https://bdbackend.qspiders.com/familiar/companylist/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.companies = response.data.results;
          return response.data.results;
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
            `https://bdbackend.qspiders.com/familiar/interview-rounds/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.interviewRounds = response.data.results;
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
            `https://bdbackend.qspiders.com/familiar/mode-of-hiring/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.modeofHiring = response.data.results;
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
            `https://bdbackend.qspiders.com/familiar/mode-of-interview/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.interviewtype = response.data.results;
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
            `https://bdbackend.qspiders.com/courses/courses/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.courses = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getDesignation(data) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `https://bdbackend.qspiders.com/commons/designation/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.designation = response.data.results;
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
            `https://bdbackend.qspiders.com/commons/gender/`,
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

    async getOrganisation(data) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `https://bdbackend.qspiders.com/branches/organisation/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.organisation = response.data.results;
          return response.data.results;
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
            `https://bdbackend.qspiders.com/commons/cities/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.cities = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getGraduationType(data) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.get(
            `https://bdbackend.qspiders.com/familiar/graduationtype/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.graduationtype = response.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async postRequirementForm(form) {
      console.log("formm dataa js", form);
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const response = await axios.post(
            "https://bdbackend.qspiders.com/bd/add-requirement/",
            form,
            { headers }
          );
          return response;
        } catch (err) {
          return { message: "Error has occured", error: err };
        }
      }
    },

    async getRequirementList(page = 1) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(
            `https://bdbackend.qspiders.com/bd/requirement-list/?page=${page}`,
            {
              headers: headers,
            }
          );
          this.reqList = records.data.results;
          this.reqlistCount = records.data.total;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getQualificationType(type) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(
            `https://bdbackend.qspiders.com/education/degree/?qualification_type=${type}`,
            {
              headers: headers,
            }
          );
          return records.data;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getStreamsType(type) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(
            `https://bdbackend.qspiders.com/education/streams/?qualification_type=${type}`,
            {
              headers: headers,
            }
          );
          return records.data;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },

    async getReqCategory(type) {
      const user = sessionStore();
      const token = user.user.token;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };
        try {
          const records = await axios.get(
            `http://192.168.1.202:7000/familiar/categorylist/?per_page=200`,
            {
              headers: headers,
            }
          );
          this.reqCategory = records.data.results;
        } catch (err) {
          console.log("errors", err);
        }
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(careercStore, import.meta.hot));
}
