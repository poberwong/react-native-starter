package com.rnstarter.modules;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.rnstarter.R;

import java.util.HashMap;
import java.util.Map;

public class ConfigModule extends ReactContextBaseJavaModule {
    private static final String APP_MODE = "APP_MODE";
    private static final String BASE_BACKEND = "BASE_BACKEND";

    public ConfigModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "Config";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(APP_MODE, getReactApplicationContext().getResources().getString(R.string.app_mode));
        constants.put(BASE_BACKEND, getReactApplicationContext().getResources().getString(R.string.base_backend));
        return constants;
    }
}