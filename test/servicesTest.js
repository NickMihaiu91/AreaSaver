var expect = chai.expect;

suite('Angular Services Test', function () {
    suite('UUID Generator', function () {
        var uuidGeneratorService;

        setup(function () {
            module('uuidGeneratorServiceModule');
            inject(function (_uuidGeneratorService_) {
                uuidGeneratorService = _uuidGeneratorService_;
            });
        });

        test('Should have a working uuid generator service', function () {
            expect(uuidGeneratorService).to.not.be.null;
        });

        test('Generate UUID', function () {
            var uuid = uuidGeneratorService.generateUUID();
            expect(uuid).to.not.be.null;
        });

        test('Generate UUID length', function () {
            var uuid = uuidGeneratorService.generateUUID();
            expect(uuid).to.have.lengthOf(36);
        });
    });

    suite('Storage Service', function () {
        var storageService;

        setup(function () {
            module('storageServiceModule');
            inject(function (_storageService_) {
                storageService = _storageService_;
            });
        });

        test('Should have a working storage service', function () {
            expect(storageService).to.not.be.null;
        });

        test('Store array data', function () {
            var objArr = [{
                    'test': 'test'
                }],
                key = 'test',
                storedObjArr;

            storageService.set(key, objArr);
            storedObjArr = storageService.get(key);

            expect(storedObjArr).to.deep.equal(objArr);
        });
    });

    suite('Area Service', function () {
        var areaService;

        setup(function () {
            module('areaServiceModule');
            inject(function (_areaService_) {
                areaService = _areaService_;
            });
        });

        test('Should have a working area service', function () {
            expect(areaService).to.not.be.null;
        });

        test('Add area', function () {
            var areas = areaService.getAreas();
            areaService.addArea('test', {});
            console.log(areas);
            expect(areas).to.have.length.of.at.least(1);
        });

        test('Edit area', function () {
            var areas = areaService.getAreas();
            areaService.addArea('test', {
                'coord': 33
            });
            areaService.editArea(areas[0].id, {
                'coord': 22
            });

            console.log(areas);
            expect(areas[0].coordinates).to.deep.equal({
                'coord': 22
            });
        });

        test('Edit area name', function () {
            var areas = areaService.getAreas();
            areaService.addArea('test', {});
            areaService.editAreaName(areas[0].id, 'new name');

            console.log(areas);
            expect(areas[0].name).to.equal('new name');
        });

        test('Delete area', function () {
            var areas = areaService.getAreas(),
                id;
            areaService.addArea('test', {});
            id = areas[0].id;
            areaService.deleteArea(id, 'new name');

            var foundIndex = areas.findIndex(area => area.id === id);

            console.log(areas, foundIndex);
            expect(foundIndex).to.equal(-1);
        });
    });
});