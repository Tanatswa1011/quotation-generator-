import React from 'react';

const Templates = ({ selectedTemplate, setSelectedTemplate }) => {
  const templates = [
    { id: 1, name: 'Template 1' },
    { id: 2, name: 'Template 2' },
    { id: 3, name: 'Template 3' },
  ];

  return (
    <div>
      <h2>Select Template</h2>
      {templates.map((template) => (
        <div key={template.id}>
          <input
            type="radio"
            id={`template-${template.id}`}
            name="template"
            value={template.id}
            checked={selectedTemplate === template.id}
            onChange={() => setSelectedTemplate(template.id)}
          />
          <label htmlFor={`template-${template.id}`}>{template.name}</label>
        </div>
      ))}
    </div>
  );
};

export default Templates;
