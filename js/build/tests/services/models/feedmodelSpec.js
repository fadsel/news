// Generated by CoffeeScript 1.6.3
/*

ownCloud - News

@author Bernhard Posselt
@copyright 2012 Bernhard Posselt dev@bernhard-posselt.com

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
License as published by the Free Software Foundation; either
version 3 of the License, or any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU AFFERO GENERAL PUBLIC LICENSE for more details.

You should have received a copy of the GNU Affero General Public
License along with this library.  If not, see <http://www.gnu.org/licenses/>.
*/


(function() {
  describe('FeedModel', function() {
    var _this = this;
    beforeEach(module('News'));
    beforeEach(module(function($provide) {
      _this.imagePath = jasmine.createSpy('imagePath');
      _this.utils = {
        imagePath: _this.imagePath
      };
      $provide.value('Utils', _this.utils);
    }));
    beforeEach(inject(function(FeedModel, _Model) {
      _this.FeedModel = FeedModel;
      _this._Model = _Model;
    }));
    it('should extend _Model', function() {
      return expect(_this.FeedModel instanceof _this._Model).toBeTruthy();
    });
    it('should bind an imagepath to the item if the url is empty', function() {
      var item;
      item = {
        id: 3,
        faviconLink: null,
        url: 'hi'
      };
      _this.FeedModel.add(item);
      return expect(_this.utils.imagePath).toHaveBeenCalledWith('news', 'rss.svg');
    });
    it('should add feeds without id', function() {
      var item, item2;
      item = {
        faviconLink: null,
        url: 'hi'
      };
      _this.FeedModel.add(item);
      item2 = {
        faviconLink: null,
        url: 'his'
      };
      _this.FeedModel.add(item2);
      expect(_this.FeedModel.getByUrl('hi')).toBe(item);
      return expect(_this.FeedModel.size()).toBe(2);
    });
    it('should clear the url cache', function() {
      var item;
      item = {
        faviconLink: null,
        url: 'hi'
      };
      _this.FeedModel.add(item);
      _this.FeedModel.clear();
      expect(_this.FeedModel.getByUrl('hi')).toBe(void 0);
      return expect(_this.FeedModel.size()).toBe(0);
    });
    it('should delete items from the fodername cache', function() {
      var item;
      item = {
        id: 3,
        faviconLink: null,
        url: 'hi'
      };
      _this.FeedModel.add(item);
      expect(_this.FeedModel.size()).toBe(1);
      _this.FeedModel.removeById(3);
      expect(_this.FeedModel.getByUrl('hi')).toBe(void 0);
      return expect(_this.FeedModel.size()).toBe(0);
    });
    it('should update the id if an update comes in with an id', function() {
      var item, item2;
      item = {
        faviconLink: null,
        url: 'hi',
        test: 'heheh'
      };
      _this.FeedModel.add(item);
      item2 = {
        id: 3,
        faviconLink: null,
        url: 'hi',
        test: 'hoho'
      };
      _this.FeedModel.add(item2);
      expect(_this.FeedModel.getByUrl('hi').id).toBe(3);
      expect(_this.FeedModel.getByUrl('hi').test).toBe('hoho');
      expect(_this.FeedModel.getById(3).id).toBe(3);
      expect(_this.FeedModel.getById(3).test).toBe('hoho');
      return expect(_this.FeedModel.size()).toBe(1);
    });
    it('should update normally', function() {
      var item, item2;
      item = {
        id: 3,
        faviconLink: null,
        url: 'hi',
        test: 'heheh'
      };
      _this.FeedModel.add(item);
      item2 = {
        id: 3,
        faviconLink: null,
        url: 'his',
        test: 'hoho'
      };
      _this.FeedModel.add(item2);
      expect(_this.FeedModel.getByUrl('hi')).toBe(void 0);
      expect(_this.FeedModel.getByUrl('his').id).toBe(3);
      expect(_this.FeedModel.getByUrl('his').test).toBe('hoho');
      expect(_this.FeedModel.getById(3).test).toBe('hoho');
      return expect(_this.FeedModel.size()).toBe(1);
    });
    it('should clear invalidate the query cache on adding folder with name', function() {
      var item, item2;
      item = {
        faviconLink: null,
        url: 'hi',
        test: 'heheh',
        folderId: 0
      };
      expect(_this.FeedModel.getAllOfFolder(0).length).toBe(0);
      _this.FeedModel.add(item, false);
      expect(_this.FeedModel.getAllOfFolder(0).length).toBe(0);
      item2 = {
        faviconLink: null,
        url: 'his',
        test: 'heheh',
        folderId: 0
      };
      _this.FeedModel.add(item2);
      return expect(_this.FeedModel.getAllOfFolder(0).length).toBe(2);
    });
    return it('should only update feeds that contain only an id but no url', function() {
      var item, item2;
      item = {
        id: 3,
        unreadCount: 232
      };
      _this.FeedModel.add(item);
      expect(_this.FeedModel.size()).toBe(0);
      item2 = {
        id: 3,
        unreadCount: 2,
        faviconLink: null,
        url: 'his'
      };
      _this.FeedModel.add(item2);
      _this.FeedModel.add(item);
      expect(_this.FeedModel.size()).toBe(1);
      return expect(_this.FeedModel.getById(3).unreadCount).toBe(232);
    });
  });

}).call(this);