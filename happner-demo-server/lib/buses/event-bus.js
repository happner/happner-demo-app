/*
this component is exposed by happn, and is wrapped to provide a shared space for events to occur across the system
*/
module.exports = class EventBus {
	emitMeshEvent($happn, path, data) {
		console.log(`Emitting on path: ${path}`);
		$happn.emit(path, data);
	}
};
