import axios from "axios";
import { ApiConstants } from "../constants";

class Api {
  constructor() {
    this.baseUrl = ApiConstants.baseUrl;
  }

  async _post(endPoint, obj, success, failure) {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    }
    try {
      let res = await this.instance.post(endPoint, obj);
      if (res) {
        success(res);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      if (error) {
        if (error === "Network Error") {
          failure("Network Error");
        } else {
          failure(
            typeof error?.response?.data?.message === "object"
              ? error?.response?.data?.message[0]
              : error?.response?.data?.message
          );
        }
      }
    }
  }

  async _get(endPoint, success, failure) {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          Accept: "application/json",
        },
      });
    } else {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    }
    try {
      let res = await this.instance.get(endPoint);
      if (res) {
        success(res);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      if (error) {
        if (error === "Network Error") {
          failure("Network Error");
        } else {
          failure(
            typeof error?.response?.data?.message === "object"
              ? error?.response?.data?.message[0]
              : error?.response?.data?.message
          );
        }
      }
    }
  }

  async _postImage(endPoint, obj, success, failure) {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
    }
    try {
      let res = await this.instance.post(endPoint, obj);
      if (res) {
        success(res);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      if (error) {
        if (error === "Network Error") {
          failure("Network Error");
        } else {
          failure(
            typeof error?.response?.data?.message === "object"
              ? error?.response?.data?.message[0]
              : error?.response?.data?.message
          );
        }
      }
    }
  }

  async _getWithObj(endPoint, obj, success, failure) {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          Accept: "application/json",
        },
      });
    } else {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    }
    try {
      let res = await this.instance.get(endPoint, { params: obj });
      if (res) {
        success(res);
      }
    } catch (error) {
      if (error) {
        if (error === "Network Error") {
          failure("Network Error");
        } else {
          failure(
            typeof error?.response?.data?.message === "object"
              ? error?.response?.data?.message[0]
              : error?.response?.data?.message
          );
        }
      }
    }
  }
  async _patch(endPoint, obj, success, failure) {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    }
    try {
      let res = await this.instance.patch(endPoint, obj);
      if (res) {
        success(res);
      }
    } catch (error) {
      if (error) {
        if (error === "Network Error") {
          failure("Network Error");
        } else {
          failure(
            typeof error?.response?.data?.message === "object"
              ? error?.response?.data?.message[0]
              : error?.response?.data?.message
          );
        }
      }
    }
  }
  async _patchM(endPoint, obj, success, failure) {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
    }
    try {
      let res = await this.instance.patch(endPoint, obj);
      if (res) {
        success(res);
      }
    } catch (error) {
      if (error) {
        if (error === "Network Error") {
          failure("Network Error");
        } else {
          failure(
            typeof error?.response?.data?.message === "object"
              ? error?.response?.data?.message[0]
              : error?.response?.data?.message
          );
        }
      }
    }
  }
  async _delete(endPoint, success, failure) {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    }
    try {
      let res = await this.instance.delete(endPoint);
      if (res) {
        success(res);
      }
    } catch (error) {
      if (error) {
        if (error === "Network Error") {
          failure("Network Error");
        } else {
          failure(
            typeof error?.response?.data?.message === "object"
              ? error?.response?.data?.message[0]
              : error?.response?.data?.message
          );
        }
      }
    }
  }
  async _deleteWithObj(endPoint, obj, success, failure) {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      this.instance = axios.create({
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    }
    try {
      let res = await this.instance.delete(endPoint, obj);
      if (res) {
        success(res);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      if (error) {
        if (error === "Network Error") {
          failure("Network Error");
        } else {
          failure(
            typeof error?.response?.data?.message === "object"
              ? error?.response?.data?.message[0]
              : error?.response?.data?.message
          );
        }
      }
    }
  }
}

export default new Api();
