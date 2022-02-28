/**
 * You can customize the initial state of the module from the editor initialization, by passing the following [Configuration Object](https://github.com/artf/grapesjs/blob/master/src/device_manager/config/config.js)
 * ```js
 * const editor = grapesjs.init({
 *  deviceManager: {
 *    // options
 *  }
 * })
 * ```
 *
 * Once the editor is instantiated you can use its API. Before using these methods you should get the module from the instance
 *
 * ```js
 * const deviceManager = editor.Devices;
 * ```
 * ## Available Events
 * * `device:add` - Added new device. The [Device] is passed as an argument to the callback
 * * `device:remove` - Device removed. The [Device] is passed as an argument to the callback
 * * `device:select` - New device selected. The newly selected [Device] and the previous one, are passed as arguments to the callback
 * * `device:update` - Device updated. The updated [Device] and the object containing changes are passed as arguments to the callback
 * * `device` - Catch-all event for all the events mentioned above. An object containing all the available data about the triggered event is passed as an argument to the callback
 *
 * ## Methods
 * * [add](#add)
 * * [get](#get)
 * * [getAll](#getAll)
 *
 * [Device]: device.html
 *
 * @module Devices
 */
import defaults from './config/config';
import Device from './model/Device';
import Devices from './model/Devices';
import DevicesView from './view/DevicesView';

export const evAll = 'device';
export const evPfx = `${evAll}:`;
export const evSelect = `${evPfx}select`;
export const evSelectBefore = `${evSelect}:before`;
export const evUpdate = `${evPfx}update`;
export const evAdd = `${evPfx}add`;
export const evAddBefore = `${evAdd}:before`;
export const evRemove = `${evPfx}remove`;
export const evRemoveBefore = `${evRemove}:before`;

export default () => {
  let c = {};
  let devices;
  let view;

  return {
    name: 'DeviceManager',

    Device,

    Devices,

    events: {
      all: evAll,
      select: evSelect,
      selectBefore: evSelectBefore,
      update: evUpdate,
      add: evAdd,
      addBefore: evAddBefore,
      remove: evRemove,
      removeBefore: evRemoveBefore
    },

    init(config = {}) {
      c = { ...defaults, ...config };

      devices = new Devices();
      (c.devices || []).forEach(dv => this.add(dv.id || dv.name, dv.width, dv));

      return this;
    },

    /**
     * Add new device.
     * @param {String} id Device id
     * @param {String} width Width of the device
     * @param {Object} [options] Custom options
     * @returns {[Device]} Added device
     * @example
     * deviceManager.add('tablet', '900px');
     * deviceManager.add('tablet2', '900px', {
     *  height: '300px',
     *  // At first, GrapesJS tries to localize the name by device id.
     *  // In case is not found, the `name` property is used (or `id` if name is missing)
     *  name: 'Tablet 2',
     *  widthMedia: '810px', // the width that will be used for the CSS media
     * });
     */
    add(id, width, options = {}) {
      const obj = {
        ...options,
        id,
        name: options.name || id,
        width: width
      };
      return devices.add(obj);
    },

    /**
     * Return device by name
     * @param  {String} name Name of the device
     * @returns {[Device]}
     * @example
     * var device = deviceManager.get('Tablet');
     * console.log(JSON.stringify(device));
     * // {name: 'Tablet', width: '900px'}
     */
    get(name) {
      return devices.get(name);
    },

    /**
     * Return all devices
     * @return {Collection}
     * @example
     * var devices = deviceManager.getAll();
     * console.log(JSON.stringify(devices));
     * // [{name: 'Desktop', width: ''}, ...]
     */
    getAll() {
      return devices;
    },

    render() {
      view && view.remove();
      view = new DevicesView({
        collection: devices,
        config: c
      });
      return view.render().el;
    },

    destroy() {
      devices.reset();
      devices.stopListening();
      view && view.remove();
      [devices, view].forEach(i => (i = null));
      c = {};
    }
  };
};
