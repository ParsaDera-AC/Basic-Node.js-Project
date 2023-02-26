// @ts-nocheck

import AbstractEntityModel from './AbstractEntityModel';
import Event from './Event';

import {ObjectModel,DateModel,StringModel,NumberModel,ArrayModel,BooleanModel,Required,ModelValue,_getPropertyModel} from '@hilla/form';

import {Email,Null,NotNull,NotEmpty,NotBlank,AssertTrue,AssertFalse,Negative,NegativeOrZero,Positive,PositiveOrZero,Size,Past,Future,Digits,Min,Max,Pattern,DecimalMin,DecimalMax} from '@hilla/form';

/**
 * This module is generated from com.example.application.data.entity.Event.
 * All changes to this file are overridden. Please consider to make changes in the corresponding Java file if necessary.
 * @see {@link file:///H:/Coding%20Projects/Ski%20Patrol/Basic-Node.js-Project/src/main/java/com/example/application/data/entity/Event.java}
 */
export default class EventModel<T extends Event = Event> extends AbstractEntityModel<T> {
  static createEmptyValue: () => Event;

  get eventName(): StringModel {
    return this[_getPropertyModel]('eventName', StringModel, [true, new NotEmpty()]);
  }

  get location(): StringModel {
    return this[_getPropertyModel]('location', StringModel, [true, new NotEmpty()]);
  }

  get time(): DateModel {
    return this[_getPropertyModel]('time', DateModel, [true, new NotNull()]);
  }

  get date(): DateModel {
    return this[_getPropertyModel]('date', DateModel, [true, new NotNull()]);
  }

}
