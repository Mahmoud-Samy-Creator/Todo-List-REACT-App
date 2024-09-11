// Control the application language
// 1) Arabic language
const arabicLang = {
    direction: "rtl",
    textAligning: "right",
    fontFamilyType: "Beiruti",
    header: 'مهامي',
    toggleButtons: {
        all: "الكل",
        completed: "منجز",
        notCompleted: "غير منجز"
    },
    todoAddForm: {
        label: "عنوان المهمة",
        button: "اضافة المهمة",
        confirmMessage: "تم اضافة المهمة بنجاح"
    },
    todoPropEdit: {
        header: "تعديل المهمة",
        label: {
            name: "اسم المهمة",
            disc: "وصف المهمة"
        },
        buttons: {
            close: "إغلاق",
            edit: "تعديل"
        }
    },
    todoDelete: {
        header: "هل انت متأكد من رغبتك في حذف المهمة ؟",
        message: "لا يمكنك التراجع عن الحذف بعد اتمامه",
        buttons: {
            close: "إغلاق",
            delete: "تأكيد الحذف"
        }
    },
    todoAddMessage: "تمت الاضافة بنجاح",
    todoDeletMessage: "تم مسح المهمة بنجاح",
    todoEditMessage: "تم تعديل المهمة بنجاح"
}

// 1) English language
const englishLang = {
    textAligning: "left",
    direction: "ltr",
    fontFamilyType: "SUSU",
    header: "Todo's",
    toggleButtons: {
        all: "all",
        completed: "done",
        notCompleted: "not done"
    },
    todoAddForm: {
        label: "to do name",
        button: "Add",
        confirmMessage: "To-do added succesfully"
    },
    todoPropEdit: {
        header: "Edit todo",
        label: {
            name: "name",
            disc: "details"
        },
        buttons: {
            close: "Close",
            edit: "Edit"
        }
    },
    todoDelete: {
        header: "Are you sure you want to delete this to do!",
        message: "You can't undo this action",
        buttons: {
            close: "Close",
            delete: "Confirm delete"
        }
    },
    todoAddMessage: "To-do added successfully",
    todoDeletMessage: "To-do deleted successfully",
    todoEditMessage: "To-do Edited successfully"
}

export { arabicLang, englishLang };