import React, { useState, useEffect, use } from 'react';
import { Plus, Edit2, Trash2, Save, X, User, MessageSquare, Briefcase, Mail, Phone, Github, Linkedin, Globe, ExternalLink, Code } from 'lucide-react';
import { server } from '../components/server';
import axios from "axios"


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('skills');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'contacts', label: 'Contacts', icon: MessageSquare, color: 'blue' },
    { id: 'projects', label: 'Projects', icon: Briefcase, color: 'purple' },
    { id: 'skills', label: 'Skills', icon: Code, color: 'orange' },
    { id: 'info', label: 'Personal Info', icon: User, color: 'green' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'contacts':
        return <ContactPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'skills':
        return <SkillsPage />;
      case 'info':
        return <PersonalInfoPage />;
      default:
        return <ContactPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your portfolio content and contacts</p>
        </div>

        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-xl border border-gray-200">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-medium ${
                  isActive
                    ? `bg-${tab.color}-600 text-white shadow-md`
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="transition-all duration-200 ease-in-out">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}


// Initial Data
const initialContacts = [
  { id: 1, name: "John Doe", email: "john@example.com", message: "Interested in your web development services." },
  { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Looking for a React developer for my startup." },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", message: "Can you help with my e-commerce project?" }
];


const initialProjects = [
  {
    title: "CourseHub",
    description: "An online course management platform for teachers and students.",
    features: [
      "Role-based access (admin, student, teacher)",
      "Course creation, uploading videos, notes",
      "Secure login with JWT"
    ],
    techStack: ["React", "Node.js", "MongoDB", "TailwindCSS"],
    github: "https://github.com/aryanmehta-dev/coursehub",
    website: "https://coursehub.example.com",
    linkedin: "kin",
    imageURL: "https://youtu.be/coursehubdemo"
  },
  {
    title: "SmartCart",
    description: "A smart e-commerce app with AI-based recommendations.",
    features: [
      "Shopping cart with live offers",
      "Voice search product lookup",
      "Recommendation engine using collaborative filtering"
    ],
    techStack: ["Vue", "Firebase", "TensorFlow.js"],
    github: "https://github.com/aryanmehta-dev/smartcart",
    linkedin: "hsop",
    website: "https://smartcart.example.com",
    imageURL: "jhug"
  }
];


// Initial Skills Data
const initialSkills = [
  { 
    id: 1,
    name: "React",
    description: "Building dynamic user interfaces with hooks, context, and modern patterns",
  },
  { 
    id: 2,
    name: "Vue.js", 
    description: "Component-based applications with Vuex state management",
  },
];


// Skills Page Component
const SkillsPage = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const getSkills = async () => {
    try {
      const response = await axios.get(`${server}skills`);
      setSkills(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createSkill = async (skillData) => {
    try {
      const newSkill = {
        id: Date.now(),
        ...skillData
      };
      await axios.post(`${server}skills`, newSkill);
      setSkills([...skills, newSkill]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSkill = async (id, skillData) => {
    try {
      await axios.put(`${server}skills/${id}`, skillData);
      setSkills(skills.map(skill => 
        skill.id === id ? { ...skill, ...skillData } : skill
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSkill = async (id) => {
    try {
      await axios.delete(`${server}skills/${id}`);
      setSkills(skills.filter(skill => skill.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSkill(null);
  };

  const handleSaveSkill = (skillData) => {
    if (editingSkill) {
      updateSkill(editingSkill.id, skillData);
    } else {
      createSkill(skillData);
    }
    setShowForm(false);
    setEditingSkill(null);
  };

  useEffect(() => {
    getSkills(); // Uncomment when connected to actual API
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code className="text-orange-600" size={24} />
          <h1 className="text-2xl font-bold text-gray-900">Skills</h1>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            {skills.length}
          </span>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus size={16} />
          Add Skill
        </button>
      </div>

      {showForm && (
        <SkillForm
          skill={editingSkill}
          onSave={handleSaveSkill}
          onCancel={handleCancel}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(skill => (
          <div key={skill.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{skill.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(skill)}
                  className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Skill Form Component
const SkillForm = ({ skill, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: skill?.name || '',
    description: skill?.description || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.description.trim()) {
      onSave(formData);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {skill ? 'Edit Skill' : 'Add New Skill'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skill Name
          </label>
          <input
            type="text"
            placeholder="e.g., React, Vue.js, JavaScript"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            placeholder="Describe your experience and expertise with this skill..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-24 resize-none"
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Save size={16} />
            {skill ? 'Update Skill' : 'Add Skill'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};


// Contact Page Component
const ContactPage = () => {
  const [contacts, setContacts] = useState(initialContacts)


  const getContacts = async () => {
    try {
      axios.get(`${server}contacts`).then((data) => {
        console.log(data.data)
        setContacts(data.data)

      })
    } catch (error) {
      console.log(error)
    }
  }


  const deleteContact = async (id) => {
    try {
      await axios.delete(`${server}contacts/${id}`).then((data) => {
        console.log(data.data)
        getContacts()
      })
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
getContacts()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="text-blue-600" size={24} />
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {contacts.length}
        </span>
      </div>

      <div className="grid gap-4">
        {contacts.map(contact => (
          <div key={contact.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                  </div>
                </div>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{contact.message}</p>
              </div>
              <button
                onClick={() => deleteContact(contact.id)}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Project Form Component
const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    features: project?.features,
    techStack: project?.techStack,
    github: project?.github || '',
    website: project?.website || '',
    linkedin: project?.linkedin || '',
    imageURL: project?.imageURL || ''
  });

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Project Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="url"
          placeholder="Website URL"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <textarea
        placeholder="Project Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
        required
      />

      <textarea
        placeholder="Features (one per line)"
        value={formData.features}
        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Tech Stack (comma separated)"
          value={formData.techStack}
          onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          placeholder="Image/Demo URL"
          value={formData.imageURL}
          onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save size={16} />
          Save Project
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <X size={16} />
          Cancel
        </button>
      </div>
    </div>
    // </form>
  );
};

// Projects Page Component
const ProjectsPage = () => {
  const [editingProject, setEditingProject] = useState(null);

  const [projects, setProjects] = useState([
    {
      title: "CourseHub",
      description: "An online course management platform for teachers and students.",
      features: '["Role-based access (admin, student, teacher)"]',
      techStack: '["React", "Node.js", "MongoDB", "TailwindCSS"]',
      github: "https://github.com/aryanmehta-dev/coursehub",
      website: "https://coursehub.example.com",
      linkedin: "kin",
      imageURL: "https://youtu.be/coursehubdemo"
    },
  ])
  const [showForm, setShowForm] = useState(false);

  const getProjects = async () => {
    await axios.get(`${server}projects`).then((data) => {
      console.log("hello")
      setProjects(data.data)
      console.log(data.data)
    }).catch((e) => {
      console.log(e)
    })
  }

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const deleteProject = async (id) => {
    await axios.delete(`${server}projects/${id}`).then((d) => {
      console.log(d.data)
      getProjects()
    }).catch((e) => {
      console.log(e)
    })
  }

  const updateProject = async (id, projectData) => {
    await axios.put(`${server}projects/${id}`, projectData).then((d) => {
      console.log("put", d)
      getProjects()
    }).catch((e) => {
      console.log(e)
    })
  }


  const createProject = async (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      features: projectData.features.split('\n').filter(f => f.trim()),
      techStack: projectData.techStack.split(',').map(t => t.trim()).filter(t => t)
    };
    await axios.post(`${server}projects`, newProject).then((d) => {
      console.log(d)
      getProjects()
    }).catch((e) => {
      console.log(e)
    })
  }

  const handleSaveProject = (projectData) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      createProject(projectData);
    }
    setShowForm(false);
    setEditingProject(null);
  };




  useEffect(() => {
    getProjects()
    // setFormData({
    //   ...personalInfo,
    //   // occupation: JSON.parse(personalInfo.occupation.join(', ')
    // });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Briefcase className="text-purple-600" size={24} />
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            {projects.length}
          </span>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={handleCancel}
        />
      )}

      <div className="grid gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {JSON.parse(project.features).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {JSON.parse(project.techStack).map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  {project.github && (
                    <a href={project.github} className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                      <Github size={14} />
                      Code
                    </a>
                  )}
                  {project.website && (
                    <a href={project.website} className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                      <Globe size={14} />
                      Live Site
                    </a>
                  )}
                  {project.imageURL && (
                    <a href={project.imageURL} className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                      <ExternalLink size={14} />
                      Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Personal Info Page Component
const PersonalInfoPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState();
  const [personalInfo, setPersonalInfo] = useState({
    name: "Aryan Mehta",
    occupation: '["Full Stack Developer", "Open Source Contributor", "Tech Blogger"]',
    email: "aryanmehta.dev@example.com",
    mobile: "+91 987654321",
    github: "https://github.com/aryanmehta-dev",
    linkedin: "https://linkedin.com/in/aryanmehta-dev",
    bio: "",
    goal: ""
  })

  const getPersonalInfo = async () => {
    await axios.get(`${server}me`).then((data) => {
      console.log("hello")
      setPersonalInfo(data.data[0])
      setFormData(data.data[0])

      console.log(data.data[0])
    }).catch((e) => {
      console.log(e)
    })
  }


  useEffect(() => {
    getPersonalInfo()
    setFormData({
      ...personalInfo,
      // occupation: JSON.parse(personalInfo.occupation.join(', ')
    });
  }, []);


  const updatePersonalInfo = async (newInfo) => {


    await axios.put(`${server}me/${personalInfo.id}`, newInfo).then((d) => {
      console.log(d)
    }).catch((e) => {
      console.log(e)
    })
    // setPersonalInfo({
    //   ...newInfo,
    //   // occupation: newInfo.occupation.split(',').map(o => o.trim()).filter(o => o)                                                                
    // });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updatePersonalInfo(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User className="text-green-600" size={24} />
          <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Edit2 size={16} />
          {isEditing ? 'View Mode' : 'Edit Mode'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => { console.log(formData); setFormData({ ...formData, name: e.target.value }) }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Occupation (comma separated)</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
              <textarea
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className={`flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${isEditing ? "" : "bg-slate-500"}`}
                disabled={!isEditing}
              >
                <Save size={16} />
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{personalInfo.name}</h2>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {
                  // (stringArray)
                  JSON.parse(personalInfo.occupation).map((occupation, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {occupation}
                    </span>
                  ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="text-gray-500" size={18} />
                <span className="text-gray-700">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gray-500" size={18} />
                <span className="text-gray-700">{personalInfo.mobile}</span>
              </div>
              <div className="flex items-center gap-3">
                <Github className="text-gray-500" size={18} />
                <a href={personalInfo.github} className="text-blue-600 hover:underline">GitHub Profile</a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="text-gray-500" size={18} />
                <a href={personalInfo.linkedin} className="text-blue-600 hover:underline">LinkedIn Profile</a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About Me</h3>
              <p className="text-gray-700 leading-relaxed">{personalInfo.bio}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">My Goal</h3>
              <p className="text-gray-700 leading-relaxed">{personalInfo.goal}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
