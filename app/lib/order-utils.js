// Helper function to determine step status in order progress
export const getStepStatus = (currentStatus, stepStatus) => {
  const statusOrder = ['PENDING', 'IN_PROCESS', 'DELIVERED'];
  const currentIndex = statusOrder.indexOf(currentStatus);
  const stepIndex = statusOrder.indexOf(stepStatus);
  return stepIndex <= currentIndex;
};

// Get status display information
export const getStatusInfo = (status) => {
  const statusMap = {
    'PENDING': {
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      icon: 'ClockIcon',
      label: 'Pending'
    },
    'IN_PROCESS': {
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      icon: 'ClockIcon',
      label: 'In Process'
    },
    'DELIVERED': {
      color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      icon: 'CheckCircleIcon',
      label: 'Delivered'
    },
    'CANCELLED': {
      color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      icon: 'XCircleIcon',
      label: 'Cancelled'
    }
  };
  
  return statusMap[status] || statusMap['PENDING'];
};