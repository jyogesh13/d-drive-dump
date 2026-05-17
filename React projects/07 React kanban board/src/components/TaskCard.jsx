const TaskCard = ({ 
  task, 
  onStatusChange, 
  availableStatuses, 
  onDragStart, 
  onDragEnd, 
  isDragging 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO':
        return 'bg-red-500';
      case 'IN_PROGRESS':
        return 'bg-yellow-500';
      case 'DONE':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'TODO':
        return 'To Do';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'DONE':
        return 'Done';
      default:
        return status;
    }
  };

  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      className={`bg-gray-900 rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-gray-600 cursor-move ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
    >
      {/* Drag Handle */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="text-gray-500 hover:text-gray-300 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
          </div>
          <span className="text-xs text-gray-500 font-medium">Drag to move</span>
        </div>
      </div>

      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-semibold text-sm leading-tight flex-1 pr-2">
          {task.title}
        </h3>
        <div className="relative group">
          <div className={`${getStatusColor(task.status)} w-3 h-3 rounded-full flex-shrink-0 mt-1 cursor-pointer`} 
               title={getStatusText(task.status)}>
          </div>
          {/* Status Change Dropdown */}
          <div className="absolute right-0 top-6 hidden group-hover:block bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 min-w-32">
            {availableStatuses.map((status) => (
              <button
                key={status}
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(task.id, status);
                }}
                className={`block w-full text-left px-3 py-2 text-xs hover:bg-gray-700 first:rounded-t-md last:rounded-b-md ${
                  task.status === status ? 'bg-gray-700' : ''
                }`}
              >
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(status)}`}></span>
                {getStatusText(status)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task Description */}
      <p className="text-gray-400 text-xs mb-4 leading-relaxed">
        {task.desc}
      </p>

      {/* Task Footer */}
      <div className="flex items-center justify-between">
        {/* Assignee */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            {task.assignedTo.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-gray-300 text-xs font-medium">
            {task.assignedTo.name}
          </span>
        </div>

        {/* Created Date */}
        <div className="text-gray-500 text-xs">
          {formatDate(task.createdAt)}
        </div>
      </div>

      {/* Task ID Badge */}
      <div className="mt-3 pt-3 border-t border-gray-700">
        <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs font-mono">
          #{task.id}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;