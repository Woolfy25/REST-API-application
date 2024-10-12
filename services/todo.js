const fs = require("fs").promises;
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "..", "db", "tasks.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const tasks = JSON.parse(data);
    console.table(tasks);
    return tasks;
  } catch (error) {
    console.error("Eroare la cititrea fisierului", error.message);
    throw error;
  }
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Eroare la cititrea fisierului");
    }
    const parsedObject = JSON.parse(data);
    const filteredData = parsedObject.filter((item) => item.id === contactId);
    console.table(filteredData);
  });
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const tasks = JSON.parse(data);
    const index = tasks.findIndex((item) => item.id === contactId);
    if (index !== -1) {
      tasks.splice(index, 1);

      await fs.writeFile(contactsPath, JSON.stringify(tasks));
      console.log("Taskul a fost sters");
    } else {
      console.log("Utilizatorul nu a fost gasit!");
    }
  } catch (error) {
    console.error("Eroare la cititrea fisierului");
  }
}

async function addContact(task) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const tasks = JSON.parse(data);
    const newContact = {
      id: nanoid(),
      task: task,
    };

    tasks.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(tasks));
    console.log("Taskul a fost adaugat");
    return tasks;
  } catch (error) {
    console.error("Eroare la cititrea fisierului", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
