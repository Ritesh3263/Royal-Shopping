import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';


export const CUSTOM_CONFIG = new InjectionToken('customConfig');

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _configSubject: BehaviorSubject<any>;
  private readonly _defaultConfig: any;

  constructor(
    private _router: Router,
    @Inject(CUSTOM_CONFIG) private _config
  ) {
    // Set the default config from the user provided config (from forRoot)
    this._defaultConfig = _config;

    // Initialize the service
    this._init();
  }

  set config(value) {
    // Get the value from the behavior subject
    let config = this._configSubject.getValue();

    // Merge the new config
    config = _.merge({}, config, value);

    // Notify the observers
    this._configSubject.next(config);
  }

  get config(): any | Observable<any> {
    return this._configSubject.asObservable();
  }

  get defaultConfig(): any {
    return this._defaultConfig;
  }

  private _init(): void {

    // Set the config from the default config
    this._configSubject = new BehaviorSubject(_.cloneDeep(this._defaultConfig));

    // Reload the default layout config on every RoutesRecognized event
    // if the current layout config is different from the default one
    this._router.events.pipe(filter(event => event instanceof ResolveEnd)).subscribe(() => {
      if (!_.isEqual(this._configSubject.getValue().layout, this._defaultConfig.layout)) {
        // Clone the current config
        const config = _.cloneDeep(this._configSubject.getValue());

        // Reset the layout from the default config
        config.layout = _.cloneDeep(this._defaultConfig.layout);

        // Set the config
        this._configSubject.next(config);
      }
    });
  }

  setConfig(value, opts = { emitEvent: true }): void {
    // Get the value from the behavior subject
    let config = this._configSubject.getValue();

    // Merge the new config
    config = _.merge({}, config, value);

    // If emitEvent option is true...
    if (opts.emitEvent === true) {
      // Notify the observers
      this._configSubject.next(config);
    }
  }

  getConfig(): Observable<any> {
    return this._configSubject.asObservable();
  }

  resetToDefaults(): void {
    // Set the config from the default config
    this._configSubject.next(_.cloneDeep(this._defaultConfig));
  }
}
