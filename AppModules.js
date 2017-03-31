var Consts = require('./consts.js')

class AppModules{

	getDemoModules(){
		let modules = [];
		modules.push(this.getModule(Consts.MODULES.USER_NEW));
		modules.push(this.getModule(Consts.MODULES.USERS));
		modules.push(this.getModule(Consts.MODULES.DOORS));
		modules.push(this.getModule(Consts.MODULES.BUILDINGS));
		modules.push(this.getModule(Consts.MODULES.USER_DETAIL, 1));
		modules.push(this.getModule(Consts.MODULES.DOOR_DETAIL, 1));
		modules.push(this.getModule(Consts.MODULES.BUILDING_DETAIL, 1));

		return modules;
	}

	getModule(module, source_id){
		return {
			type: module,
			source_id: source_id
		};
	}


}

module.exports = new AppModules();