// todo possible coupling of DOM and data
function ProjectManager(projectSettings){
  this.projectData = {};
  // input, will modify value
  this.nameElement = document.getElementById(projectSettings.nameElementId);
  // anything, will modify innerHTML
  this.dataElement = document.getElementById(projectSettings.dataElementId);
}
ProjectManager.prototype.renderData = function(){
  this.dataElement.innerHTML = JSON.stringify(this.projectData);
}
ProjectManager.prototype.renderName = function(){
  this.nameElement.value = this.projectData.name;
}
ProjectManager.prototype.renderAll = function(){
  this.renderData();
  this.renderName();
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
// todo possible bad separation of concerns. ProjectManager doesnt need to know how to handle files
ProjectManager.prototype.updateProjectDataWithFile = function(file){
  // hack to reach projManag instance
  var self = this;
  var reader = new FileReader();
  // async callback
  reader.onload = function(event){
    self.projectData = JSON.parse(event.target.result);
    self.renderAll();
  };
  reader.readAsText(file);
}
