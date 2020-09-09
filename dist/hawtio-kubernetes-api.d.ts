/// <reference types="core-dts" />
/// <reference types="urijs" />
/// <reference types="angular" />
declare module KubernetesAPI {
    class consts {
        readonly NAMESPACE_STORAGE_KEY: string;
    }
    var Constants: consts;
    interface ApiLocation {
        proto?: string;
        hostPort: string;
        prefix: string;
    }
    interface ApiLocations {
        openshift?: ApiLocation;
        k8s?: ApiLocation;
    }
    interface KubernetesConfig {
        master_uri?: string;
        api?: ApiLocations;
        openshift?: OpenShiftOAuthConfig;
        google?: GoogleOAuthConfig;
        keycloak?: KeyCloakAuthConfig;
    }
    interface OpenShiftOAuthConfig {
        oauth_authorize_uri: string;
        oauth_client_id: string;
    }
    interface GoogleOAuthConfig {
        authenticationURI: string;
        authorizationURI: string;
        clientId: string;
        clientSecret: string;
        redirectURI: string;
        scope: string;
        tokenURI?: string;
    }
    interface KeyCloakAuthConfig {
        oauth_authorize_uri: string;
        oauth_client_id: string;
    }
    interface KubernetesState {
        namespaces: Array<string>;
        selectedNamespace: string;
    }
    class KindTypes {
        static readonly LIST: string;
        static readonly ENDPOINTS: string;
        static readonly EVENTS: string;
        static readonly NAMESPACES: string;
        static readonly NODES: string;
        static readonly PERSISTENT_VOLUMES: string;
        static readonly PERSISTENT_VOLUME_CLAIMS: string;
        static readonly PODS: string;
        static readonly REPLICATION_CONTROLLERS: string;
        static readonly REPLICA_SETS: string;
        static readonly RESOURCE_QUOTAS: string;
        static readonly OAUTH_CLIENTS: string;
        static readonly SECRETS: string;
        static readonly SERVICES: string;
        static readonly SERVICE_ACCOUNTS: string;
        static readonly CONFIG_MAPS: string;
        static readonly INGRESSES: string;
        static readonly TEMPLATES: string;
        static readonly ROUTES: string;
        static readonly BUILD_CONFIGS: string;
        static readonly BUILDS: string;
        static readonly DEPLOYMENT_CONFIGS: string;
        static readonly DEPLOYMENTS: string;
        static readonly IMAGES: string;
        static readonly IMAGE_STREAMS: string;
        static readonly IMAGE_STREAM_TAGS: string;
        static readonly POLICIES: string;
        static readonly POLICY_BINDINGS: string;
        static readonly PROJECTS: string;
        static readonly ROLE_BINDINGS: string;
        static readonly ROLES: string;
        static readonly DAEMONSETS: string;
    }
    class WatchTypes {
        static readonly LIST: string;
        static readonly ENDPOINTS: string;
        static readonly EVENTS: string;
        static readonly NAMESPACES: string;
        static readonly NODES: string;
        static readonly PERSISTENT_VOLUMES: string;
        static readonly PERSISTENT_VOLUME_CLAIMS: string;
        static readonly PODS: string;
        static readonly REPLICATION_CONTROLLERS: string;
        static readonly REPLICA_SETS: string;
        static readonly RESOURCE_QUOTAS: string;
        static readonly OAUTH_CLIENTS: string;
        static readonly SECRETS: string;
        static readonly SERVICES: string;
        static readonly SERVICE_ACCOUNTS: string;
        static readonly CONFIG_MAPS: string;
        static readonly INGRESSES: string;
        static readonly TEMPLATES: string;
        static readonly ROUTES: string;
        static readonly BUILD_CONFIGS: string;
        static readonly BUILDS: string;
        static readonly DEPLOYMENT_CONFIGS: string;
        static readonly DEPLOYMENTS: string;
        static readonly IMAGES: string;
        static readonly IMAGE_STREAMS: string;
        static readonly IMAGE_STREAM_TAGS: string;
        static readonly POLICIES: string;
        static readonly POLICY_BINDINGS: string;
        static readonly PROJECTS: string;
        static readonly ROLE_BINDINGS: string;
        static readonly ROLES: string;
        static readonly DAEMONSETS: string;
    }
    class ExtensionTypes {
        static readonly extensions: Array<string>;
    }
    class NamespacedTypes {
        static readonly k8sTypes: Array<string>;
        static readonly osTypes: Array<string>;
    }
    interface K8SOptions {
        kind?: string;
        namespace?: string;
        apiVersion?: string;
        labelSelector?: string;
        object?: any;
        success?: (objs: any[]) => void;
        error?: (err: any) => void;
        urlFunction?: (options: K8SOptions) => string;
    }
    class WatchActions {
        static readonly INIT: string;
        static readonly ANY: string;
        static readonly ADDED: string;
        static readonly MODIFIED: string;
        static readonly DELETED: string;
    }
    interface ObjectMap {
        [uid: string]: any;
    }
    interface Collection {
        wsURL: string;
        restURL: string;
        namespace: string;
        kind: string;
        connected: boolean;
        connect(): any;
        get(cb: (data: any[]) => void): void;
        watch(cb: (data: any[]) => void): (data: any[]) => void;
        unwatch(cb: (data: any[]) => void): void;
        put(item: any, cb: (data: any) => void, error?: (err: any) => void): void;
        delete(item: any, cb: (data: any) => void, error?: (err: any) => void): void;
        getKey(): string;
    }
    interface K8SClientFactory {
        create(kind: any, namespace?: string): Collection;
        destroy(client: Collection, ...handles: Array<(data: any[]) => void>): void;
    }
}
declare module KubernetesAPI {
    var pluginName: string;
    var log: Logging.Logger;
    var osConfig: KubernetesConfig;
    var masterUrl: string;
    var isOpenShift: boolean;
    var K8S_PREFIX: string;
    var OS_PREFIX: string;
    var K8S_EXT_PREFIX: string;
    var K8S_API_VERSION: string;
    var OS_API_VERSION: string;
    var K8S_EXT_VERSION: string;
}
declare module KubernetesAPI {
    function masterApiUrl(): string;
    function namespaced(kind: string): boolean;
    function kubernetesApiPrefix(): string;
    function kubernetesApiExtensionPrefix(): string;
    function openshiftApiPrefix(kind: string): string;
    function apiForKind(kind: string): string;
    function apiGroupForKind(kind: string): "oauth.openshift.io" | "build.openshift.io" | "apps.openshift.io" | "image.openshift.io" | "project.openshift.io" | "authorization.openshift.io" | "route.openshift.io" | "template.openshift.io";
    function prefixForKind(kind: string): string;
    function getErrorObject(jqXHR: any): any;
    function wsScheme(url: string): "wss" | "ws";
    function toKindName(kind: any): any;
    function toCollectionName(kind: any): any;
    function wsUrl(url: string): uri.URI;
    function equals(left: any, right: any): boolean;
    /**
     *
     * Kubernetes object helpers
     *
     **/
    /**
     * Create a list of kubernetes objects suitable for posting a bunch of objects
     */
    function createList(...objects: any[]): {
        apiVersion: string;
        kind: any;
        objects: any[];
    };
    /**
     * Create an object suitable for delete/del
     */
    function createShallowObject(name: string, kind: string, namespace?: string): {
        apiVersion: string;
        kind: any;
        metadata: {
            name: string;
            namespace: string;
        };
    };
    /**
     * Returns a fully scoped name with the namespace/kind, suitable to use as a key in maps
     **/
    function fullName(entity: any): string;
    function getUID(entity: any): any;
    function getNamespace(entity: any): any;
    function getApiVersion(entity: any): any;
    function getLabels(entity: any): any;
    function getName(entity: any): any;
    function getKind(entity: any): any;
    function getSelector(entity: any): any;
    function getHost(pod: any): any;
    function getStatus(pod: any): any;
    function getPorts(service: any): any;
    function getCreationTimestamp(entity: any): any;
    /**
     * Returns true if the current status of the pod is running
     */
    function isRunning(podCurrentState: any): any;
    function podStatus(pod: any): any;
}
declare module KubernetesAPI {
    var _module: angular.IModule;
}
declare module KubernetesAPI {
    var pollingOnly: string[];
    class CollectionImpl implements Collection {
        private _options;
        private _kind;
        private _namespace;
        private _path;
        private _apiVersion;
        private handlers;
        private list;
        constructor(_options: K8SOptions);
        readonly options: K8SOptions;
        private readonly _restUrl;
        private readonly _wsUrl;
        getKey(): string;
        readonly wsURL: string;
        readonly restURL: string;
        readonly namespace: string;
        readonly kind: string;
        readonly connected: boolean;
        connect(): void;
        destroy(): void;
        get(cb: (data: any[]) => void): void;
        private getPrefix;
        private restUrlFor;
        watch(cb: (data: any[]) => void): (data: any[]) => void;
        unwatch(cb: (data: any[]) => void): void;
        put(item: any, cb: (data: any) => void, error?: (err: any) => void): void;
        delete(item: any, cb: (data: any) => void, error?: (err: any) => void): void;
    }
    var K8SClientFactory: K8SClientFactory;
    function get(options: K8SOptions): void;
    function del(options: any): void;
    function put(options: any): void;
    function watch(options: K8SOptions): {
        client: Collection;
        handle: (data: any[]) => void;
        disconnect: () => void;
    };
}
