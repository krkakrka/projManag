function ProjectManager(){
  this.projectData = {};
}
ProjectManager.prototype.loadProjectData = function(data){
  this.projectData = data;
}
ProjectManager.prototype.renderData = function(elementId){
  var projectDataEl = document.getElementById(elementId);
  projectDataEl.innerHTML = JSON.stringify(this.projectData);
}
ProjectManager.prototype.downloadProjectData = function(){
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.projectData));
  var a = document.createElement('a');
  a.href = 'data:' + data;
  var fileName = projectData.name || 'project';
  a.download = fileName + '.json';
  a.click();
}
// todo return promise or use callback? Or some sort of event? So that something else could know that data has been updated.
ProjectManager.prototype.updateProjectDataWithFile = function(file){
  // hack to reach projManag instance
  var self = this;
  var reader = new FileReader();
  // async callback
  reader.onload = function(event){
    self.projectData = JSON.parse(event.target.result);
  };
  reader.readAsText(file);
}
