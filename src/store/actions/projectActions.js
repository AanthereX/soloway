import Api from "../../api/Api";
import { EndPoint } from "../../api/EndPoint";
import toast from "react-hot-toast";
import {
  ADD_PROJECT_LOADING,
  ADD_PROJECT_SUCCESSFULL,
  ADD_TASK_LOADING,
  ADD_TASK_SUCCESSFULL,
  ADD_FILE_LOADING,
  ADD_FILE_SUCCESSFULL,
  ADD_USER_RELATED_PROJECT,
} from "../constants";
import { labels } from "../../configs/Labels";
// Get User Type  Api Method
export const getUserTypeApiMethod = async (users, params) => {
  const query = new URLSearchParams(params).toString();
  await Api._get(
    `${EndPoint.userType}?${query}`,
    (success) => {
      users(success?.data);
    },
    (err) => {
      // toast.error(err);
    }
  );
};

export const getProjectUserTypeApiMethod = async (id,users, params) => {
  const query = new URLSearchParams(params).toString();
  await Api._get(
    `${EndPoint.projectUserType}/${id}?${query}`,
    (success) => {
      users(success?.data);
    },
    (err) => {
      // toast.error(err);
    }
  );
};

// Get Project Client  Api Method
export const getProjectClientApiMethod = async (id,users) => {
  await Api._get(
    `${EndPoint.projectClient}/${id}`,
    (success) => {
      users(success?.data);
    },
    (err) => {
      toast.error(err);
    }
  );
};

export const addProjectApiMethod = (obj,callBack) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PROJECT_LOADING });
    await Api._post(
      EndPoint.addProject,
      obj,
      (res) => {
        callBack(res)
        toast.success(res?.data?.message);
        dispatch({
          type: ADD_PROJECT_SUCCESSFULL,
          payload: { data: res?.data },
        });
      },
      (error) => {
        toast.error(error);
        //   dispatch({ type: ADD_USER_FAILED, payload: { error } });
      }
    );
  };
};

// Get All Project  Api Method
export const getAllProjectMethod = async (project, params) => {
  const query = new URLSearchParams(params).toString();
  await Api._get(
    `${EndPoint.allProject}?${query}`,
    (success) => {
      project(success?.data);
    },
    (err) => {
      toast.error(err);
    }
  );
};

// Get user related Projects  Api Method
export const getUserRelatedProjectMethod = () => {
  return async (dispatch) => {
    await Api._get(
      `${EndPoint.relatedProject}`,
      (success) => {
        // project(success?.data?.data);
        dispatch({
          type: ADD_USER_RELATED_PROJECT,
          payload: { data: success?.data },
        });
      },
      (err) => {
        toast.error(err);
      }
    );
  };
};

// Get Create Task  Api Method
export const createTaskApiMethod = (obj, callBack) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TASK_LOADING });
    await Api._post(
      EndPoint.createTask,
      obj,
      (res) => {
        callBack(res);
        toast.success(res?.data?.message);
        dispatch({ type: ADD_TASK_SUCCESSFULL, payload: { data: res?.data } });
      },
      (error) => {
        toast.error(error);
        //   dispatch({ type: ADD_USER_FAILED, payload: { error } });
      }
    );
  };
};
// Send Notification Task  Api Method
export const sendNotificationApiMethod = (obj) => {
  return async (dispatch) => {
    await Api._post(
      EndPoint.sendNotification,
      obj,
      (res) => {
        // callBack(res)
        // toast.success(res?.data?.message);
      },
      (error) => {
        toast.error(error);
      }
    );
  };
};

// Send Project Discussion  Email  Api Method
export const projectDiscussionEmailApiMethod = (obj) => {
  return async (dispatch) => {
    await Api._post(
      EndPoint.projectDiscussionEmail,
      obj,
      (res) => {
        // callBack(res)
        // toast.success(res?.data?.message);
      },
      (error) => {
        toast.error(error);
      }
    );
  };
};

// Send task Comment  Email  Api Method
export const taskCommentEmailApiMethod = (obj) => {
  return async (dispatch) => {
    await Api._post(
      EndPoint.taskCommentEmail,
      obj,
      (res) => {
        // callBack(res)
        // toast.success(res?.data?.message);
      },
      (error) => {
        toast.error(error);
      }
    );
  };
};
// Send task Comment Reminder  Api Method
export const taskCommentReminderApiMethod = (id,obj) => {
  return async (dispatch) => {
    await Api._post(
      `${EndPoint.taskCommentReminder}?taskId=${id}`,
      obj,
      (res) => {
        // callBack(res)
        // toast.success(res?.data?.message);
      },
      (error) => {
        toast.error(error);
      }
    );
  };
};


// Get User details  Api Method
export const ProjectDetailsApiMethod = async (id, project) => {
  await Api._get(
    `${EndPoint.projectById}/${id}`,
    (success) => {
      project(success?.data?.data);
    },
    (err) => {
      toast.error(err);
    }
  );
};

// Get user related Projects  Api Method
export const getAllTaskProjectMethod = async (id, params, project) => {
  const query = new URLSearchParams(params).toString();
  await Api._get(
    `${EndPoint.allTask}/${id}?${query}`,
    (success) => {
      project(success?.data?.data);
    },
    (err) => {
      toast.error(err);
    }
  );
};

//  Projects status Change  Api Method
export const projectStatusChangeMethod = async (id, params,callBack) => {
  const query = new URLSearchParams(params).toString();
  await Api._patch(
    `${EndPoint.projectStatus}/${id}?${query}`,
    {},
    (success) => {
      callBack(success)
      toast.success(success?.data?.message);
    },
    (err) => {
      toast.error(err);
    }
  );
};

//  Single Projects   Api Method
export const singleProjectMethod = async (id,callBack) => {
  await Api._patch(
    `${EndPoint.singleProject}/${id}`,
    {},
    (success) => {
      callBack(success)
      // toast.success(success?.data?.message);
    },
    (err) => {
      toast.error(err);
    }
  );
};
//  Projects task status Change  Api Method
export const projectTaskStatusChangeMethod = async (id, obj,callBack) => {
  await Api._patch(
    `${EndPoint.taskStatus}/${id}`,
    obj,
    (success) => {
      callBack(success)
      toast.success(success?.data?.message);
    },
    (err) => {
      toast.error(err);
    }
  );
};

// Create File Upload  Api Method
export const createFileUploadApiMethod = (obj, callBack,loader) => {
  loader(true)
  return async (dispatch) => {
    dispatch({ type: ADD_FILE_LOADING });
    await Api._post(
      EndPoint.createFile,
      obj,
      (res) => {
        loader(false)
        callBack(res);
        toast.success(res?.data?.message);
        dispatch({ type: ADD_FILE_SUCCESSFULL, payload: { data: res?.data } });
      },
      (error) => {
        loader(false)
        toast.error(error);
        //   dispatch({ type: ADD_USER_FAILED, payload: { error } });
      }
    );
  };
};

// Add Budget  Api Method
export const addBudgetApiMethod = (obj, callBack,loader) => {
  loader(true)
  return async (dispatch) => {
    await Api._post(
      EndPoint.addBudget,
      obj,
      (res) => {
        loader(false)
        callBack(res);
        toast.success(res?.data?.message);
        dispatch({ payload: { data: res?.data } });
      },
      (error) => {
        loader(false)
        // toast.error(error);
      }
    );
  };
};

// Get All Project files  Api Method
export const allProjectFileApiMethod = async (id,params, project) => {
  const query = new URLSearchParams(params).toString();
  await Api._get(
    `${EndPoint.allProjectFile}/${id}?${query}`,
    (success) => {
      project(success?.data?.data);
    },
    (err) => {
      // toast.error(err);
    }
  );
};

// Get All Activities   Api Method
export const allActivitiesApiMethod = async (id, params, project) => {
  const query = new URLSearchParams(params).toString();
  await Api._get(
    `${EndPoint.allActivities}/${id}?${query}`,
    (success) => {
      project(success?.data?.data);
    },
    (err) => {
      // toast.error(err);
    }
  );
};

// Delete Project Api Method
export const DeleteProjectApiMethod = async (id,callBack) => {
  await Api._delete(
    `${EndPoint.deleteProject}/${id}`,
    (success) => {
      callBack(success);
      toast.success(success?.data?.message);
    },
    (err) => {
      toast.error(err);
    }
  );
};

// Delete Task Api Method
export const DeleteTaskApiMethod = async (id) => {
  await Api._delete(
    `${EndPoint.deleteTask}/${id}`,
    (success) => {
      toast.success(success?.data);
    },
    (err) => {
      toast.error(err);
    }
  );
};

// Update Task Api Method
export const updateTaskApiMethod = (id, obj) => {
  return async (dispatch) => {
    await Api._patch(
      `${EndPoint.editTask}/${id}`,
      obj,
      (res) => {
        toast.success(res?.data?.message);
      },
      (error) => {
        toast.error(error);
      }
    );
  };
};

// Update Project Api Method
export const updateProjectApiMethod = (id, obj,callBack) => {
  return async (dispatch) => {
    await Api._patch(
      `${EndPoint.editProject}/${id}`,
      obj,
      (res) => {
        callBack(res)
        toast.success(res?.data?.message);
      },
      (error) => {
        toast.error(error);
      }
    );
  };
};

// Get Budget  Api Method
export const projectBudgetApiMethod = async (id, params, budget) => {
  const query = new URLSearchParams(params).toString();
  await Api._get(
    `${EndPoint.projectBudget}/${id}?${query}`,
    (success) => {
      // callBack(success)
      budget(success?.data?.data);
    },
    (err) => {
      // toast.error(err);
    }
  );
};

// Get attachments   Api Method
export const taskAttachmentsApiMethod = async (id, attachment) => {
  await Api._get(
    `${EndPoint.taskAttachments}/${id}`,
    (success) => {
      attachment(success?.data?.data);
    },
    (err) => {
      toast.error(err);
    }
  );
};

export const budgetDetailsApiMethod = async (id, budget) => {
  await Api._get(
    `${EndPoint.budgetDetails}/${id}`,
    (success) => {
      budget(success?.data?.data);
    },
    (err) => {
      toast.error(err);
    }
  );
};

// Add File Attachment  Api Method
export const addFileAttachmentApiMethod = (obj, callBack) => {
  return async (dispatch) => {
    await Api._postImage(
      EndPoint.addFileAttachment,
      obj,
      (res) => {
        callBack(res);
        toast.success(res?.data?.message);
      },
      (error) => {
        toast.error(error);
      }
    );
  };
};

export const addImageAttachmentApiMethod = async (obj, callBack, file) => {
  await Api._postImage(
    EndPoint.addImageAttachment,
    obj,
    (res) => {
      callBack(res);
      file(res?.data?.data);
    },
    (error) => {
      // toast.error(error);
    }
  );
};

//  Project Comment Api Method
export const projectCommentApiMethod = async (id) => {
  await Api._patch(
    `${EndPoint.projectComment}/${id}`,
    {},
    (res) => {
      // toast.success(res?.data?.message);
    },
    (error) => {
      toast.error(error);
    }
  );
};

//  Delete File Api Method
export const deleteFileApiMethod = async (id,callBack) => {
  await Api._delete(
    `${EndPoint.deleteFile}/${id}`,
    (res) => {
      callBack(res)
      toast.success(res?.data?.message);
    },
    (error) => {
      toast.error(error);
    }
  );
};

//  Delete Budget Api Method
export const deleteBudgetApiMethod = async (id,callBack) => {
  await Api._delete(
    `${EndPoint.deleteBudget}/${id}`,
    (res) => {
      callBack(res)
      toast.success(labels.budgetDeleted);
    },
    (error) => {
      toast.error(error);
    }
  );
};


//  Delete Attachment File Api Method
export const deleteAttachmentApiMethod = async (id,callBack) => {
  await Api._delete(
    `${EndPoint.deleteAttachment}/${id}`,
    (res) => {
      callBack(res)
      toast.success(res?.data?.message);
    },
    (error) => {
      toast.error(error);
    }
  );
};
